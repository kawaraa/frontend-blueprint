# frontend-blueprint Source Code folders and files structure

Structuring the folders and files in your frontend project is crucial for maintaining a clean and organized codebase. While there's no one-size-fits-all UI framework solution, a well-thought-out structure makes it easier for developers to understand, maintain, and scale the application. Here's a common approach for structuring a only the reusable components.

### Root Directory:

- **config:** Configuration files for your application (database configurations, environment variables, etc.).

Model (M): Represents the data and business logic of the application. In a frontend context it is implemented as service, models often correspond to data structures, API interactions, state management, and business logic related to data manipulation.

View (V): Represents the presentation layer of the application. Views are responsible for rendering UI components, displaying data to users, and handling user interactions. In frontend frameworks like React or Vue.js, views are typically implemented as components.

Controller (C): In a frontend application, controllers are often replaced with components, routers, or state management libraries. Components encapsulate both the presentation logic (how UI elements are rendered) and the behavior logic (how UI elements respond to user interactions). Routers handle navigation between different views or components, while state management libraries help manage application state and data flow.

### Theme colors:

#### Light:

- Background (bg): `white` Or `neutral-50`
- Card background (cbg): `#fafafa` / `zinc-50` or `#e8e6e6`
- Text and focused border (t): `#414141` / `slate-700`

#### Dark:

- Background (dbg): `black` Or `#121212` / `gray-950`
- Card background (dcbg): `#272727` / `zinc-800` or `neutral-900`
- Text and focused border (dt): `#dcd9d9` / `gray-300`

#### Shared:

- primary color (pc): `Choose the primary color of the theme`
- Error (red): `#f55c4a` / `red-400`
- Success (Green): `#a1c517` / `lime-500`
- Warning (Yellow):`#fdc902` / `yellow-400`
- Borders, lines and dividers (gray): `#999997` / `gray-500`
- Hover effect (h): `#0000001a`
- Links and actions (Blue): `#47A5de` / `blue-500` Or `cyan-400`
