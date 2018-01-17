pragma solidity^0.4.11;

contract Certificate {

    mapping(uint => Record) records;
    uint public count = 0;
    uint public i = 0;

    struct Record {
        uint256 id;
        string name;
        string certDate;
        string certName;
        address organization;
    }


    //creates certificates and prevent duplicates of IDs
    function setCertificate(uint256 id, string name, string certDate, string certName) {
        for(i=0; i<count; i++){
            require(records[i].id != id);
        }

        records[count] = Record(id, name, certDate, certName, msg.sender);
        count++;
    }



    function getCertificate(uint index) constant returns(uint256 id, string name, string certDate, string certName, string organization) {
        id = records[index].id;
        name = records[index].name;
        certDate = records[index].certDate;
        certName = records[index].certName;
        return;
    }

    //loop through different IDs

    function getCertificateById(uint256 id) constant returns(uint256 idRet, string name, string certDate, string certName, address organization){
        for(i=0; i<count; i++){
               if (records[i].id == id) {
                idRet = records[i].id;
                name = records[i].name;
                certDate = records[i].certDate;
                certName = records[i].certName;
                organization = records[i].organization;
                return;
               }
            }
    }

}
