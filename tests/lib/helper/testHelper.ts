import hcloud from "../../../src/lib/hcloud";
import { Organization } from "../../../src/lib/interfaces/IDP";

export const constantTestUser = {
    name: "Test_Constant_User",
    email: "test.user@msp.com",
    password: "Test123!",
};

export const constantTestOrgMemberUser = {
    _id: "",
    name: "Test_Constant_Org_Member_User",
    email: "test.orgMemberUser@msp.com",
    password: "Test123!",
};

const constantTestOrganization = {
    name: "Constant_Test_Organization",
    company: "Test_Company",
};

export async function getTestUserHcloudClient(): Promise<hcloud> {
    const hcloudClient = new hcloud({ api: "https://dev.app.helmut.cloud" });
    let testUser;
    try {
        testUser = await hcloudClient.IDP.authenticate(constantTestUser.email, constantTestUser.password);
        hcloudClient.setAuthToken(testUser.token);
    } catch (error) {
        testUser = await hcloudClient.IDP.register(constantTestUser.name, constantTestUser.email, constantTestUser.password);
        testUser = await hcloudClient.IDP.authenticate(constantTestUser.email, constantTestUser.password);
        hcloudClient.setAuthToken(testUser.token);
    }

    return hcloudClient;
}

export async function getTestOrgMemberUserHcloudClient(): Promise<hcloud> {
    const hcloudClient = new hcloud({ api: "https://dev.app.helmut.cloud" });
    let testUser;
    try {
        testUser = await hcloudClient.IDP.authenticate(constantTestOrgMemberUser.email, constantTestOrgMemberUser.password);
        hcloudClient.setAuthToken(testUser.token);
    } catch (error) {
        testUser = await hcloudClient.IDP.register(constantTestOrgMemberUser.name, constantTestOrgMemberUser.email, constantTestOrgMemberUser.password);
        testUser = await hcloudClient.IDP.authenticate(constantTestOrgMemberUser.email, constantTestOrgMemberUser.password);
        hcloudClient.setAuthToken(testUser.token);
    }
    constantTestOrgMemberUser._id = testUser.user._id;
    return hcloudClient;
}

export async function getTestOrganization(hcloudClient: hcloud): Promise<Organization> {
    let userOrgs = await hcloudClient.IDP.organization.listOrganizations();
    let organization = userOrgs.find(org => org.name === constantTestOrganization.name && org.company === constantTestOrganization.company);
    if (organization){
        return organization;
    }
    organization = await hcloudClient.IDP.organization.createOrganization(constantTestOrganization.name, constantTestOrganization.company);
    return organization;
}
