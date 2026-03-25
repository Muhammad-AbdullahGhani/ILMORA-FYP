import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { ArrowLeft, Database, FileText, RefreshCw, Search, ShieldAlert, UserCog, Users, Download, Activity, ShieldCheck, AlertTriangle } from "lucide-react";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from "recharts";
import { axiosClient } from "@/shared/utils/axiosClient";

const toRoleBadgeVariant = (role) => role === "admin" ? "default" : "outline";

const formatDate = (value) => {
  if (!value) return "n/a";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "n/a" : date.toLocaleString();
};

const maskEmail = (email) => {
  if (!email || !email.includes("@")) return email || "n/a";
  const [name, domain] = email.split("@");
  if (name.length <= 2) return `${name[0] || "*"}***@${domain}`;
  return `${name.slice(0, 2)}***@${domain}`;
};

export function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [auditEntries, setAuditEntries] = useState([]);
  const [moderationReviews, setModerationReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyRoleId, setBusyRoleId] = useState(null);
  const [moderationBusy, setModerationBusy] = useState(false);
  const [moderationFilter, setModerationFilter] = useState("pending");
  const [selectedReviewIds, setSelectedReviewIds] = useState([]);
  const [hidePii, setHidePii] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashboardRes, analyticsRes, usersRes, logsRes, auditRes, moderationRes] = await Promise.all([
        axiosClient.get("/admin/dashboard"),
        axiosClient.get("/admin/analytics"),
        axiosClient.get("/admin/users"),
        axiosClient.get("/admin/logs"),
        axiosClient.get("/admin/audit?limit=25"),
        axiosClient.get(`/admin/reviews/moderation?status=${moderationFilter}&limit=20`)
      ]);
      setDashboard(dashboardRes.data);
      setAnalytics(analyticsRes.data?.analytics || null);
      setUsers(usersRes.data?.users || []);
      setLogs(logsRes.data?.logs || []);
      setAuditEntries(auditRes.data?.entries || []);
      setModerationReviews(moderationRes.data?.reviews || []);
      setSelectedReviewIds([]);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load admin console");
    } finally {
      setLoading(false);
    }
  };

  const loadModeration = async () => {
    try {
      const response = await axiosClient.get(`/admin/reviews/moderation?status=${moderationFilter}&limit=20`);
      setModerationReviews(response.data?.reviews || []);
      setSelectedReviewIds([]);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load moderation queue");
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!loading) {
      loadModeration();
    }
  }, [moderationFilter]);

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return users;
    return users.filter((user) =>
      [user.email, user.name, user.role].some((value) =>
        String(value || "").toLowerCase().includes(keyword)
      )
    );
  }, [users, search]);

  const combinedTrend = useMemo(() => {
    const usersByDay = analytics?.trends?.usersByDay || [];
    const reviewsByDay = analytics?.trends?.reviewsByDay || [];
    const map = {};
    usersByDay.forEach((row) => {
      map[row.date] = { date: row.date, users: row.users || 0, reviews: 0 };
    });
    reviewsByDay.forEach((row) => {
      if (!map[row.date]) map[row.date] = { date: row.date, users: 0, reviews: 0 };
      map[row.date].reviews = row.reviews || 0;
    });
    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
  }, [analytics]);

  const funnelData = useMemo(() => {
    const funnel = analytics?.funnel || {};
    return [
      { step: "Registered", value: funnel.registered || 0 },
      { step: "Quiz", value: funnel.quizCompleted || 0 },
      { step: "Recommendations", value: funnel.recommendationsViewed || 0 },
      { step: "Feedback", value: funnel.feedbackSubmitted || 0 }
    ];
  }, [analytics]);

  const topUniversities = analytics?.topUniversities || [];
  const alerts = dashboard?.insights?.alerts || [];

  const trackAuditEvent = async (action, details = {}, targetType = "system", targetId = null) => {
    try {
      await axiosClient.post("/admin/audit/event", { action, details, targetType, targetId });
    } catch {
      // Non-blocking for UI actions
    }
  };

  const exportUsersCsv = async () => {
    const header = ["name", "email", "role", "createdAt"];
    const rows = filteredUsers.map((u) => [
      (u.name || "").replace(/,/g, " "),
      (hidePii ? maskEmail(u.email) : (u.email || "")).replace(/,/g, " "),
      u.role || "student",
      u.createdAt || ""
    ]);
    const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `admin-users-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    await trackAuditEvent("USER_EXPORT_CSV", { count: filteredUsers.length, masked: hidePii }, "user-list");
  };

  const changeUserRole = async (user, nextRole) => {
    setBusyRoleId(user._id);
    try {
      await axiosClient.patch(`/admin/users/${user._id}/role`, { role: nextRole });
      await loadAll();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update role");
    } finally {
      setBusyRoleId(null);
    }
  };

  const moderateSingle = async (reviewId, status) => {
    const reason = status === "rejected" ? window.prompt("Reason for rejection (optional):", "") : "";
    setModerationBusy(true);
    try {
      await axiosClient.patch(`/admin/reviews/${reviewId}/moderate`, {
        status,
        reason: reason || ""
      });
      await loadModeration();
      await trackAuditEvent("MODERATION_SINGLE_ACTION", { reviewId, status }, "review", reviewId);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to moderate review");
    } finally {
      setModerationBusy(false);
    }
  };

  const moderateBulk = async (status) => {
    if (!selectedReviewIds.length) return;
    const reason = status === "rejected" ? window.prompt("Reason for bulk rejection (optional):", "") : "";
    setModerationBusy(true);
    try {
      await axiosClient.post("/admin/reviews/moderate/bulk", {
        ids: selectedReviewIds,
        status,
        reason: reason || ""
      });
      await loadModeration();
      await trackAuditEvent("MODERATION_BULK_ACTION", { count: selectedReviewIds.length, status }, "review");
    } catch (err) {
      setError(err.response?.data?.error || "Failed bulk moderation");
    } finally {
      setModerationBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 p-4 md:p-8 flex items-center justify-center">
        <div className="text-muted-foreground">Loading admin console...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted/30 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <ShieldAlert className="w-5 h-5" />
                Admin Access Error
              </CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button onClick={loadAll} variant="outline">Retry</Button>
              <Button onClick={() => setError(null)} variant="ghost">Dismiss</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const totals = analytics?.totals || dashboard?.stats || { users: 0, universities: 0, reviews: 0 };
  const roleBreakdown = analytics?.roleBreakdown || dashboard?.insights?.roleBreakdown || {};
  const moderation = analytics?.moderation || dashboard?.insights?.moderation || {};
  const cards = [
    { label: "Total Users", value: totals.users ?? 0, icon: Users },
    { label: "Universities", value: totals.universities ?? 0, icon: Database },
    { label: "Total Reviews", value: totals.reviews ?? 0, icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">Admin Control Center</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Governance dashboard with moderation, analytics, alerts, and auditability
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={exportUsersCsv}>
              <Download className="w-4 h-4 mr-2" />
              Export Users
            </Button>
            <Button variant="outline" size="sm" onClick={loadAll}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh All
            </Button>
          </div>
        </div>

        {!!alerts.length && (
          <div className="grid md:grid-cols-2 gap-4">
            {alerts.map((alert, index) => (
              <Card key={`${alert.title}-${index}`} className={alert.severity === "critical" ? "border-destructive" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    {alert.severity === "critical" ? <AlertTriangle className="w-5 h-5 text-destructive" /> : <ShieldCheck className="w-5 h-5 text-primary" />}
                    <div>
                      <div className="font-semibold">{alert.title}</div>
                      <div className="text-sm text-muted-foreground">{alert.message}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <card.icon className="w-7 h-7 text-primary" />
                  <Badge variant="outline">Live</Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{Number(card.value).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">{card.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Platform Trend</CardTitle>
              <CardDescription>Users and reviews growth over last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="reviews" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Registration to feedback pipeline</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7c3aed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="w-5 h-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Role-based control, PII masking, and export audit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder="Search by name, email, role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={hidePii} onCheckedChange={(checked) => setHidePii(Boolean(checked))} />
                  Hide emails (PII safe)
                </label>
              </div>

              <div className="overflow-x-auto border rounded-md">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Role</th>
                      <th className="text-left p-3">Created</th>
                      <th className="text-right p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="border-t">
                        <td className="p-3">{user.name || "n/a"}</td>
                        <td className="p-3">{hidePii ? maskEmail(user.email) : (user.email || "n/a")}</td>
                        <td className="p-3">
                          <Badge variant={toRoleBadgeVariant(user.role)}>{user.role || "student"}</Badge>
                        </td>
                        <td className="p-3">{formatDate(user.createdAt)}</td>
                        <td className="p-3">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>View</Button>
                            {user.role === "admin" ? (
                              <Button
                                size="sm"
                                variant="destructive"
                                disabled={busyRoleId === user._id}
                                onClick={() => changeUserRole(user, "student")}
                              >
                                Make Student
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                disabled={busyRoleId === user._id}
                                onClick={() => changeUserRole(user, "admin")}
                              >
                                Make Admin
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td className="p-6 text-center text-muted-foreground" colSpan={5}>No users found for current filter.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Distribution</CardTitle>
                <CardDescription>Admin share: {analytics?.ratios?.adminSharePct ?? 0}%</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between"><span>Admins</span><span>{roleBreakdown.admin || 0}</span></div>
                <div className="flex justify-between"><span>Students</span><span>{roleBreakdown.student || 0}</span></div>
                <div className="flex justify-between"><span>Unknown</span><span>{roleBreakdown.unknown || 0}</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Moderation KPIs</CardTitle>
                <CardDescription>Queue control and review quality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between"><span>Pending</span><span>{moderation.pending || 0}</span></div>
                <div className="flex justify-between"><span>Approved</span><span>{moderation.approved || 0}</span></div>
                <div className="flex justify-between"><span>Rejected</span><span>{moderation.rejected || 0}</span></div>
                <div className="flex justify-between"><span>Reported</span><span>{moderation.reported || 0}</span></div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Review Moderation Queue</CardTitle>
            <CardDescription>Approve or reject user-submitted reviews with bulk actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {["pending", "approved", "rejected"].map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={moderationFilter === status ? "default" : "outline"}
                  onClick={() => setModerationFilter(status)}
                >
                  {status}
                </Button>
              ))}
              <div className="ml-auto flex gap-2">
                <Button size="sm" variant="outline" disabled={!selectedReviewIds.length || moderationBusy} onClick={() => moderateBulk("approved")}>
                  Approve Selected
                </Button>
                <Button size="sm" variant="destructive" disabled={!selectedReviewIds.length || moderationBusy} onClick={() => moderateBulk("rejected")}>
                  Reject Selected
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto border rounded-md">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3">Select</th>
                    <th className="text-left p-3">University</th>
                    <th className="text-left p-3">Factor</th>
                    <th className="text-left p-3">Rating</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Created</th>
                    <th className="text-right p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {moderationReviews.map((review) => {
                    const selected = selectedReviewIds.includes(review._id);
                    return (
                      <tr key={review._id} className="border-t">
                        <td className="p-3">
                          <Checkbox
                            checked={selected}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedReviewIds((prev) => [...prev, review._id]);
                              } else {
                                setSelectedReviewIds((prev) => prev.filter((id) => id !== review._id));
                              }
                            }}
                          />
                        </td>
                        <td className="p-3">{review.university || "n/a"}</td>
                        <td className="p-3">{review.factor || "General"}</td>
                        <td className="p-3">{review.rating || 0}</td>
                        <td className="p-3"><Badge variant="outline">{review.moderationStatus || "pending"}</Badge></td>
                        <td className="p-3">{formatDate(review.createdAt)}</td>
                        <td className="p-3">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" disabled={moderationBusy} onClick={() => moderateSingle(review._id, "approved")}>Approve</Button>
                            <Button size="sm" variant="destructive" disabled={moderationBusy} onClick={() => moderateSingle(review._id, "rejected")}>Reject</Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {moderationReviews.length === 0 && (
                    <tr>
                      <td className="p-6 text-center text-muted-foreground" colSpan={7}>No reviews in this moderation state.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Universities by Engagement</CardTitle>
              <CardDescription>Based on number of reviews</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topUniversities}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="university" hide />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reviewCount" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Detail</CardTitle>
              <CardDescription>Selected profile metadata</CardDescription>
            </CardHeader>
            <CardContent>
              {!selectedUser ? (
                <div className="text-sm text-muted-foreground">No user selected.</div>
              ) : (
                <div className="space-y-3 text-sm">
                  <div><span className="text-muted-foreground">Name:</span> {selectedUser.name || "n/a"}</div>
                  <div><span className="text-muted-foreground">Email:</span> {hidePii ? maskEmail(selectedUser.email) : (selectedUser.email || "n/a")}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Role:</span>
                    <Badge variant={toRoleBadgeVariant(selectedUser.role)}>{selectedUser.role || "student"}</Badge>
                  </div>
                  <div><span className="text-muted-foreground">Created:</span> {formatDate(selectedUser.createdAt)}</div>
                  <div><span className="text-muted-foreground">User ID:</span> {selectedUser._id}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                System Activity
              </CardTitle>
              <CardDescription>Generated operational events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-72 overflow-auto">
              {logs.length === 0 ? (
                <div className="text-sm text-muted-foreground">No logs available.</div>
              ) : logs.map((log, index) => (
                <div key={`${log.timestamp}-${index}`} className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={log.level === "warn" || log.level === "critical" ? "destructive" : "outline"}>{log.level || "info"}</Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(log.timestamp)}</span>
                  </div>
                  <div className="text-sm">{log.message}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>Admin actions for accountability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-72 overflow-auto">
              {auditEntries.length === 0 ? (
                <div className="text-sm text-muted-foreground">No audit entries found.</div>
              ) : auditEntries.map((entry) => (
                <div key={entry._id} className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline">{entry.action}</Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(entry.createdAt)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Actor: {entry.actor?.id || "unknown"} ({entry.actor?.role || "n/a"})
                  </div>
                  {!!entry.details && (
                    <div className="text-xs mt-1 text-muted-foreground break-all">
                      {JSON.stringify(entry.details)}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}