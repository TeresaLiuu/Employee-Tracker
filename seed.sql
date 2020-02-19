USE employee_trackerDB;

INSERT INTO department(name) VALUES 
    ('IT Support'),
    ('Sales'),
    ('Recruiting'),
    ('Accounting');

INSERT INTO role (title, salary, department_id) VALUES 
    ('Junio Engineer', 12000, 101),
    ('Senior Engineer', 16000, 101),
    ('Sales Assistant', 6800, 102),
    ('Sales Manager',14000 , 102),
    ('Recruiter', 8000, 103),
    ('Recruiting Manager', 15000, 103),
    ('Accounting Manager', 14000, 104),
    ('Accounting Assistant', 6800, 104);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
     ('Steven','King',201,111),
     ('Neena','Kochhar',202,111),
     ('Bruce','Ernst',301,213),
     ('Valli','Austin',302,213),
     ('Dianna','Lorentz',401,313),
     ('Alexandar','Hunold',402,313),
     ('Karen','Weiss',501,414),
     ('James','Kandy',502,414);



