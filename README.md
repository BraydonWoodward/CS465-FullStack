## Architecture

### Frontend Development Comparison
In our full stack project, we utilized various types of frontend development, including Express HTML, JavaScript, and a Single-Page Application (SPA) built with Angular. 
Express HTML allows for server-side rendering, which can be beneficial for SEO and initial load times. However, it can be less interactive compared to SPAs. JavaScript enhances 
interactivity and dynamic content, while SPAs provide a seamless user experience by loading content dynamically without refreshing the entire page. This results in faster 
navigation and a more app-like feel for the admin.

### Backend Database Choice
The backend of our application uses a NoSQL MongoDB database due to its flexibility in handling unstructured data and its ability to scale horizontally. MongoDB's 
document-oriented structure allows for easy storage and retrieval of complex data types, making it ideal for applications that require rapid development and iteration.

### JSON vs. JavaScript
JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate.
Unlike JavaScript, which is a programming language, JSON is purely a data format. JSON serves as a bridge between the frontend and backend, allowing data to be exchanged 
in a structured format that both sides can understand.

### Code Refactoring and UI Components
Throughout the development process, we refactored code to improve functionality and efficiency. For instance, we created reusable UI components for trip cards and forms, 
which reduced redundancy and improved maintainability. The benefits of reusable UI components include faster development times, consistent design, and easier updates across the application.

### API Testing and Security
In a full stack application, various methods for request and retrieval necessitate API testing of endpoints( We used Postman). This includes testing for functionality, performance, 
and security. Understanding methods involves knowing how to make requests (GET, POST, PUT, DELETE) and what endpoints are available. Security testing is crucial, 
especially with added layers such as authentication and authorization, to ensure that sensitive data is protected.

### Reflection on Course Impact
This course has significantly contributed to my professional goals by enhancing my skills in full stack development. I have learned to effectively integrate frontend and backend technologies, 
improve my coding practices, and understand the importance of testing and security. These skills have made me a more marketable candidate in the tech industry, equipping me with the knowledge to tackle complex projects.


## Installation
1. Clone the repository:
   ```bash
   gh repo clone BraydonWoodward/CS465-FullStack
   cd travlr
   ```

2. Install dependencies for the frontend:
   ```bash
   cd app_admin
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd app_api
   npm install
   ```

4. Start the backend server:
   ```bash
   cd app_server
   npm start
   ```

5. Start the frontend application:
   ```bash
   cd app_admin
   ng serve
   ```

## Usage
- Navigate to `http://localhost:4200` to access the admin application.
- Use the login feature to authenticate and access trip management functionalities.
- Navigate to 'http://localhost:3000 to view the puiblic facing pages.

