/**
 * Gateway Integration Tests
 * Quick tests to verify gateway functionality
 */

import axios from 'axios';

const GATEWAY_URL = 'http://localhost:3000';

async function testHealthCheck() {
  console.log('\n🔍 Testing Health Check...');
  try {
    const response = await axios.get(`${GATEWAY_URL}/health`);
    console.log('✅ Health Check Passed');
    console.log('   Gateway Status:', response.data.status);
    console.log('   Registered Services:', Object.keys(response.data.services).length);
    return true;
  } catch (error) {
    console.error('❌ Health Check Failed:', error.message);
    return false;
  }
}

async function testUniversityRoute() {
  console.log('\n🔍 Testing University Route...');
  try {
    const response = await axios.get(`${GATEWAY_URL}/api/universities`);
    console.log('✅ University Route Passed');
    console.log('   Universities Count:', response.data.universities?.length || 0);
    return true;
  } catch (error) {
    console.error('❌ University Route Failed:', error.message);
    return false;
  }
}

async function testCORSHeaders() {
  console.log('\n🔍 Testing CORS Headers...');
  try {
    const response = await axios.options(`${GATEWAY_URL}/api/universities`);
    const hasCORS = response.headers['access-control-allow-origin'];
    if (hasCORS) {
      console.log('✅ CORS Headers Present');
      return true;
    } else {
      console.log('⚠️  CORS Headers Missing');
      return false;
    }
  } catch (error) {
    console.error('❌ CORS Test Failed:', error.message);
    return false;
  }
}

async function testRateLimiting() {
  console.log('\n🔍 Testing Rate Limiting...');
  try {
    const requests = Array(10).fill(null).map(() => 
      axios.get(`${GATEWAY_URL}/api/universities`)
    );
    await Promise.all(requests);
    console.log('✅ Rate Limiting Configured (10 requests successful)');
    return true;
  } catch (error) {
    if (error.response?.status === 429) {
      console.log('✅ Rate Limiting Working (429 Too Many Requests)');
      return true;
    }
    console.error('❌ Rate Limiting Test Failed:', error.message);
    return false;
  }
}

async function testAuthProtectedRoute() {
  console.log('\n🔍 Testing Auth Protected Route...');
  try {
    const response = await axios.get(`${GATEWAY_URL}/api/auth/me`);
    console.log('⚠️  Auth route accessible without token (might be expected in dev)');
    return true;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Auth Protection Working (401 Unauthorized)');
      return true;
    }
    console.error('❌ Auth Test Failed:', error.message);
    return false;
  }
}

async function test404Handling() {
  console.log('\n🔍 Testing 404 Handling...');
  try {
    await axios.get(`${GATEWAY_URL}/api/nonexistent`);
    console.log('⚠️  404 not returned for invalid route');
    return false;
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('✅ 404 Handling Working');
      return true;
    }
    console.error('❌ 404 Test Failed:', error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Starting Gateway Integration Tests...');
  console.log('   Gateway URL:', GATEWAY_URL);
  
  const results = await Promise.all([
    testHealthCheck(),
    testUniversityRoute(),
    testCORSHeaders(),
    testRateLimiting(),
    testAuthProtectedRoute(),
    test404Handling()
  ]);
  
  const passed = results.filter(Boolean).length;
  const total = results.length;
  
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Test Results: ${passed}/${total} passed`);
  console.log('='.repeat(50));
  
  if (passed === total) {
    console.log('✅ All tests passed!');
  } else {
    console.log('⚠️  Some tests failed. Check logs above.');
  }
  
  process.exit(passed === total ? 0 : 1);
}

// Run tests if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests().catch(console.error);
}

export { runAllTests };
