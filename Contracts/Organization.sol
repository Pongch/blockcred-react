pragma solidity^0.4.11;

contract Organization {
    struct Organization {
        string name;
        string email;
    }

    uint public count = 0;

    //define mapping 'address to struct' Instructors
    mapping (address => Organization) Organizations;

    //declare array type address and make it public
    //store all of the addresses as arrays

    address[] public OrganizationAccts;

    //register new organization
    function setOrganization( string name, string email) public {
        var organization = Organizations[msg.sender];

        organization.name = name;
        organization.email= email;
        count++;
    }

    //retrieve info on a specific organization
    function getOrganization(address _address) view public returns (string, string){
        var organization = Organizations[_address];
        return (organization.name, organization.email);
    }

}
