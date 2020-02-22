const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_tracker_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log(`connected with id ${connection.threadId}`);
    createSearch();
});


function createSearch() {
    inquirer.prompt({
        type: 'list',
        name: 'create',
        message: 'Would you like to create a Department, Role, Employee, or View the following',
        choices: ['Department', 'Role', 'Employee', 'View']
    }).then(function (promptOptions) {
        if (promptOptions.create === 'Department') {
            addDepartment();
        }
        else if (promptOptions.create === 'Role') {
            addRole();
        }
        else if (promptOptions.create === 'Employee') {
            addEmployee();
        }
        else if (promptOptions.create === 'View') {
            viewData();
        }
        else {
            connection.end();
        }
    });
}


function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What department would you like to add ?'
        }
    ]).then(function (answer) {
        connection.query('INSERT INTO department SET ?',
            {
                name: answer.department
            },
            function (err) {
                if (err) throw err;
                console.log('department added');
                createSearch();
            }
        )
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Whate role would you like to add ?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for the position ?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department ID are you adding ?'
        }
    ]).then(function (answer) {
        connection.query('INSERT INTO role SET ?',
            {
                title: answer.role,
                salary: answer.salary,
                department_id: answer.departmentId
            },
            function (err) {
                if (err) throw err;
                console.log('role added');
                createSearch();
            }
        )
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee ?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee ?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the role Id of the employee ?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the manager Id of this employee ?'
        }
    ]).then(function (answer) {
        connection.query('INSERT INTO employee SET ?',
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId
            },
            function (err) {
                if (err) throw err;
                console.log('add employee');
                createSearch();
            }
        )
    });
}

function viewData(){
    inquirer.prompt(
        {
            type:'list',
            name: 'table',
            message: 'Which table would you like to view? ',
            choices: ['Department','Role','Employee']
        }).then(function(answer){
            if(answer.table === 'Department'){
                viewDepartment();
            }
            else if (answer.table === 'Role'){
                viewRole();
            }
            else if (answer.table === 'Employee'){
                viewEmployee();
            }
            else{
                connection.end();
            }
        });
}


function viewDepartment(){
    connection.query ('SELECT * FROM department', function(err,res){
        if (err) throw err;
        console.table(res);
        createSearch();
    });
}

function viewRole(){
    connection.query('SELECT * FROM role', function(err,res){
        if (err)throw err;
        console.table(res);
        createSearch();
    });
}

function viewEmployee(){
    connection.query('SELECT * FROM employee', function(err,res){
        if (err) throw err;
        console.table(res);
        createSearch();
    });
}