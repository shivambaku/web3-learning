// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

contract SimpleStorage {
    // boolean, uint, int, address, bytes
    // bool hasFavoriteNumber = false;
    // uint256 favoriteNumber = 17;
    // string favoriteNumberInText = "Seventeen";
    // address myAddress = 0xA383AADfE9332f629B371BA001822C72BB9dB97b;
    // bytes32 favoriteBytes = "cat";
    uint256 favoriteNumber; 

    mapping(string => uint256) public nameToFavoriteNumber;

    // People public person = People({favoriteNumber: 2, name: "Patrick"});

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    // uint256[] public favoriteNumberList;
    // dynamic array People[]
    // static array people[3]
    People[] public people;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    // view function are free as they are only for reading
    // pure function are also free as they don't modify the state
    function retrieve() public view returns(uint256) {
        return favoriteNumber;
    }

    // calldata, memory, storage
    // callbdata is temporary data that can't be modified
    // memory is temporary data that can be modified
    // string is secretly an array so need to know where it will be put
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        // People memory person = People({favoriteNumber: _favoriteNumber, name: _name});
        // People memory person = People(_favoriteNumber, _name);
        people.push(People(_favoriteNumber, _name));

        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}