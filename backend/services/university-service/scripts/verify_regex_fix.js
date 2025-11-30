
const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const createQuery = (universityName) => {
    const sanitizedName = escapeRegExp(universityName).replace(/[\s\-]+/g, '[\\s\\-]+');
    return new RegExp(`^${sanitizedName}$`, 'i');
};

const testCases = [
    {
        input: "AL KHAIR UNIVERSITY [AJK], ISLAMABAD",
        dbValue: "Al-khair University [ajk], Islamabad",
        shouldMatch: true
    },
    {
        input: "AL KARAM INTERNATIONAL UNIVERSITY, ISLAMABAD",
        dbValue: "Al-karam International University, Islamabad",
        shouldMatch: true
    },
    {
        input: "BAHRIA UNIVERSITY, E 8 CAMPUS, ISLAMABAD",
        dbValue: "Bahria University, E-8 Campus, Islamabad",
        shouldMatch: true
    },
    {
        input: "Abasyn University (sub Campus), Islamabad",
        dbValue: "Abasyn University (sub Campus), Islamabad",
        shouldMatch: true
    }
];

console.log("Running Regex Verification...");

let allPassed = true;

testCases.forEach(test => {
    const regex = createQuery(test.input);
    const isMatch = regex.test(test.dbValue);

    if (isMatch === test.shouldMatch) {
        console.log(`[PASS] Input: "${test.input}" matches DB: "${test.dbValue}"`);
    } else {
        console.log(`[FAIL] Input: "${test.input}" FAILED to match DB: "${test.dbValue}"`);
        console.log(`       Regex was: ${regex}`);
        allPassed = false;
    }
});

if (allPassed) {
    console.log("\nAll regex tests passed! The fix is working.");
} else {
    console.log("\nSome tests failed. Check regex logic.");
}
