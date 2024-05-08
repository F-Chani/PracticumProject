# Employee Management System

## Project Overview

Welcome to the Employee Management System project! This web application is designed to facilitate efficient management of employee data within an organization. Built using Angular 17 for the frontend and .NET Core for the backend, the system follows a layered architecture approach with seamless database integration.

## Project Structure

The project follows a layered architecture model for better organization and maintainability:
- **Frontend (Angular 17)**: Implements user interface features for efficient employee management.
- **Backend (.NET Core)**: Provides RESTful APIs to interact with the database and manage employee data effectively.

## Features

The Employee Management System offers the following features:
- **Employee Table Management**: View, add, edit, and delete employee records.
- **Position Management**: Dynamically add positions with details.
- **Search Functionality**: Filter employees based on search criteria.
- **Export to Excel**: Export employee list to Excel file for download.

## Technologies Used

- **Client-side**: Angular17
- **Server-side**: .NET 
- **Database**: SQL Server
- **Cloud Platform**: Google Cloud Platform or AWS

## Installation

1. Clone the repository from [GitHub](https://github.com/F-Chani/PracticumProject).
```bash
git clone https://github.com/F-Chani/PracticumProject.git
```
2. Navigate to the project directory.
```bash
cd practicumProject
```
### Frontend

1. Navigate to the frontend directory.
2. Run to install dependencies.
```bash
npm install
```
3. Start the development server with:
```bash
ng serve
```
5. Access the application at http://localhost:4200.

7. ### Backend

1. Navigate to the backend directory.
2. Open the solution file in Visual Studio.
3. Ensure all necessary NuGet packages are installed.
4. Open the "Package Manager Console".
5. Initialize the database by executing:
```bash
update-database
```
6. Build and run the backend application by:
```bash
dotnet run
```
## Company Management

- Users are directed to a dashboard focused on the associated company.
- Only employees belonging to the user's company are displayed.
- A search filter enables displaying employees matching the entered text.
- Users can download a list of employees to an Excel file, including their data.
- Components for adding and editing employees allow dynamic position assignment.

## Notes
- All fields are mandatory with implemented input validation for data integrity.
- Proper data validation and error handling enhance user experience.
- Deleted employees are logically removed, preserving historical data by changing their status to inactive.


## Credits

This project was created by Chana Froidiger as part of a screening practicum. We would like to acknowledge the valuable contributions of all those involved in its development.

## Contact:
For more help or questions, see the project documentation or contact the development team at chanaf5731@gmail.com Enjoy using the employee management system!
