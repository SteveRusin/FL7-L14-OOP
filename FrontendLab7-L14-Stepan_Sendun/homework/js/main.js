(function HomeworkOOP() {



    function Casino(numberOfSlotMachines, initialAmountOfMoney) {
        
        this.machines = [];
        
        //this consol.log for showing an array of machines. You can delete it.
        console.log(this.machines);
        
        if ((typeof numberOfSlotMachines !== 'number') || (typeof initialAmountOfMoney !== 'number')) {
            
            console.log(`value of "numberOfSlotMachines" and "initialAmountOfMoney" should be number`)

        } else if ((numberOfSlotMachines < 0) || (initialAmountOfMoney < 0)) {

            console.log(`Please enter a positive value of the number of slot machines and initial amount of money!`);

        } else if ((!isInteger(numberOfSlotMachines)) || (!isInteger(initialAmountOfMoney))) {

            console.log(`Number of slot machines and initial amount of money should be integer value!`);

        } else {

           
            var resultOfDivision = initialAmountOfMoney / numberOfSlotMachines;
            var roundResultOfDivision = Math.floor(resultOfDivision);
            var rest = (resultOfDivision - roundResultOfDivision) * numberOfSlotMachines;
            var randomLucky = Math.round(Math.random() * (numberOfSlotMachines - 1));
            var machine;

            for (var i = 0; i < numberOfSlotMachines; i++) {
                machine = new SlotMachine(roundResultOfDivision);
                this.machines.push(machine);
            }

            this.machines[randomLucky]['lucky'] = true;

            //The line below is only for show off deleteMachine function by unique Id
            this.machines[1]['uniqId'] = 2;
            //=======================================================================
            
            if (!isInteger(resultOfDivision)) {
                this.machines[0]['money'] += rest;
            }
        }




        this.getTotalMoneyInCasino = function () {

            var total = 0;
            this.machines.forEach(function (el) {
                total += el['money'];
            })
            console.log(`The total amount of money in Casino - ${total}$`);


            return this;
        }

        this.getNumberOfMachinesInCasino = function () {

            console.log(`The total number of machines in Casino - ${this.machines.length}`);

            return this;
        }

        this.setNewMachine = function () {
            var notRounded;
            var rest;
            var dividedMoney;

            var sorted = this.machines.sort(function (a, b) {
                return a['money'] < b['money'];
            })


            notRounded = sorted[0]['money'] / 2;
            initialAmountOfMoney = Math.round(sorted[0]['money'] / 2);
            rest = initialAmountOfMoney - notRounded;

            this.machines.push(new SlotMachine(initialAmountOfMoney));
            sorted[0]['money'] = initialAmountOfMoney - rest * 2;

            return this;
        }

        this.deleteMachine = function (id) {

            var moneyFromDeletedMachine;
            var moneyToAdd;
            var notRounded;
            var rest;
            var indexOfDeletedMachine;
            this.machines.forEach(function (el, index) {

                if (el['uniqId'] === id) {
                    indexOfDeletedMachine = index;
                    moneyFromDeletedMachine = el['money'];
                    
                }

            })
            this.machines.splice(indexOfDeletedMachine, 1);


            if (!moneyFromDeletedMachine) {
                console.log(`Machines with id ${id} doesn't exist!`);
            } else {
                notRounded = moneyFromDeletedMachine / this.machines.length;
                moneyToAdd = Math.round(moneyFromDeletedMachine / this.machines.length);
                rest = notRounded - moneyToAdd;
                this.machines.forEach(function (el) {
                    el['money'] += moneyToAdd;
                })
                this.machines[0]['money'] += rest * this.machines.length;
                console.log(`The machine with id ${id} has been successfully deleted!`);
            }

            return this;
        }

        this.takeMoneyFromCasino = function (amountOfMoney) {

            var numberOfMachine = 0;
            var totaAmountOfMoney = 0;
            var moneyLeftedToTake = amountOfMoney;

            this.machines.forEach(function (el) {
                totaAmountOfMoney += el['money'];
            })

            if (amountOfMoney < 0) {
                console.log(`${amountOfMoney}$ - can't be a negative value. Please enter a correct value!`)
            } else if (typeof amountOfMoney !== 'number') {
                console.log(`Amount of money should be a number value!`)
            } else if (totaAmountOfMoney < amountOfMoney) {
                console.log(`The Casino doesn't have ${amountOfMoney}. That is too much!. On Casino's account are - ${totaAmountOfMoney}$ only`);
            } else {
                var sorted = this.machines.sort(function (a, b) {
                    return a['money'] < b['money'];
                });

                do {
                    this.machines[numberOfMachine]['money'] -= moneyLeftedToTake;
                    moneyLeftedToTake = 0;
                    if (this.machines[numberOfMachine]['money'] < 0) {
                        moneyLeftedToTake = this.machines[numberOfMachine]['money'] * (-1);
                        this.machines[numberOfMachine]['money'] = 0;

                    }


                    numberOfMachine++;
                } while (this.machines[numberOfMachine]);
                console.log(`On the account of the casino there are ${totaAmountOfMoney-amountOfMoney}$ left`);
            }
            return this;
        }


    } //Casino


    function SlotMachine(initialAmoutOfMoney) {
        
        this.money = initialAmoutOfMoney;
        this.uniqId = (Math.floor(new Date().valueOf() * Math.random()));
        this.lucky = false;

        this.getTotalMoneyInMachine = function () {
            console.log(`The machine with id ${this.uniqId} has ${this.money}$ left`);
            return this;
        }


        this.takeMoney = function (amountOfMoney) {
            
            if (amountOfMoney > this.money) {
                console.log(`You've tried to get ${amountOfMoney}$. The machine ${this.uniqId} has only ${this.money}$ on account`);
            } else if (amountOfMoney < 0) {
                console.log(`${amountOfMoney}$ - is a negative value. Please enter the positive one.`);
            } else {
                this.money -= amountOfMoney;
                console.log(`The machine ${this.uniqId} has ${this.money} on account left`);
            }


            return this;
        }

        this.putMoney = function (amountOfMoney) {
            
            if (amountOfMoney < 0) {
                console.log(`${amountOfMoney}$ - is a negative value. Please enter the positive one`);
            } else {
                this.money += amountOfMoney;
                console.log(`The machine ${this.uniqId} has ${this.money} on account now`);
            }
            
            return this;
        }

        this.play = function (amountOfMoney) {
            
            var firstNumber = Math.round(Math.random() * 9);
            var secondNumber = Math.round(Math.random() * 9);
            var thirdNumber = Math.round(Math.random() * 9);

            if (amountOfMoney < 0) {
                console.log(`${amountOfMoney}$ - is a negative value. Please enter the positive one`);
            } else if (!isInteger(amountOfMoney)) {
                console.log(`${amountOfMoney} should be integer value!`);
            } else {

                if ((this.lucky) && (firstNumber === 7) && (secondNumber === 7) && (thirdNumber === 7)) {
                    do {
                        firstNumber = Math.round(Math.random() * 9);
                        secondNumber = Math.round(Math.random() * 9);
                        thirdNumber = Math.round(Math.random() * 9);
                    } while ((firstNumber === 7) && (secondNumber === 7) && (thirdNumber === 7))
                }



                console.log(`${firstNumber} ${secondNumber} ${thirdNumber}`);


                if (amountOfMoney * 5 > this.money) {
                    console.log(`${amountOfMoney}$ - that is too much! Max bate is ${Math.round(this.money/5)}`);
                } else if ((firstNumber === 7) && (secondNumber === 7) && (thirdNumber === 7)) {
                    console.log(`Congratulations! You have won ${this.money}$`);
                    this.money = 0;
                } else if ((firstNumber === secondNumber) && (secondNumber === thirdNumber) && (firstNumber === thirdNumber)) {
                    console.log(`Congratulations! You have won ${amountOfMoney*5}$`);
                    this.money -= amountOfMoney * 5;
                } else if ((firstNumber === secondNumber) || (secondNumber === thirdNumber) || (firstNumber === thirdNumber)) {
                    console.log(`Congratulations! You have won ${amountOfMoney*2}$`);
                    this.money -= amountOfMoney * 2;
                } else {
                    console.log(`Ooops! You've lost!`);
                    this.money += amountOfMoney;
                }

            }
            return this;
        }



    } ///SlotMachine



    function isInteger(num) {
        return (num ^ 0) === num;
    }
        

})();

module.exports = HomeworkOOP;