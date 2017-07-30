var users = [
    {
        id: '1',
        firstName: 'Jon',
        lastName: 'Snow',
        age: 30
}, {
        id: '2',
        firstName: 'Endy',
        lastName: 'End',
        age: 35
}, {
        id: '3',
        firstName: 'Lol',
        lastName: 'Smith',
        age: 36
}];


function UsersList(users) {
    this._users = users;
    
    this.showNames = function () {
        this._users.forEach(function (el) {
            console.log(el.firstName);
        });
        return this;
    }
    
    this.showById = function (id) {
        var res = this._users.filter(function (el) {
            return el.id == id;
        });
        if (res.length) {
            console.log(res[0]);
            return this;
        } else {
            console.log(`Unable to find user with id: ${id}`);
            return this;
        }
    }

    this.add = function (firstName, lastName, age) {
        var newUser = {
            id: (Math.floor(new Date().valueOf() * Math.random())),
            firstName: firstName,
            lastName: lastName,
            age: age
        }
        console.log(`Hi everyone, i am ${firstName} with id: ${newUser.id}`);
         this._users.push(newUser);
        return this;
    }

    this.removeById = function (id) {
        var myIndex;
        var toSlice;
        this._users.forEach(function (el, index) {
            if (el.id == id) {
                toSlice = el;
                myIndex = index;
            }

        });
        if (toSlice) {
            this._users.splice(myIndex, 1);
            console.log(`buy buy ${toSlice.firstName}`);
            return this;
        } else {
            console.log(`Unable to find user with id: ${id}`);
            return this;
        }
    }

    this.logUsersCould = function () {
        console.log(this._users.length);
        return this;
    }
}



var users = new UsersList(users);


users.showNames();
users.showById(5);
users.add('Lenny', 'Bush', 25);
users.removeById('1');


users.logUsersCould().showById(2).removeById(5);