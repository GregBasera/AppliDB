// var baseurl = "http://192.168.50.46:1337";
var baseurl = "http://10.10.10.15:1337";

const Auth = baseurl + "/auth/local";
const Register = baseurl + "/auth/local/register";
const Applicants = baseurl + "/applicants";
const Users = baseurl + "/users";
const Roles = baseurl + "/users-permissions/roles";
const Depts = baseurl + "/departments";

export { Auth, Register, Applicants, Users, Roles, Depts };
