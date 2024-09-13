
Generated via ChatGPT



Here’s the detailed prompt that can be used to generate this final web page structure:

---

**Prompt:**

Create a simple website using HTML, CSS, and JavaScript to display an overview of categories with products, and each product has apps. Each category, product, and app should have a checkbox. When the category checkbox is clicked, all underlying product and app checkboxes should be selected. Similarly, when the product checkbox is clicked, all its underlying app checkboxes should be selected.

The website should have a hardcoded configuration with categories, products, and apps. Each category, product, and app should have a "snippet" property which is an array of strings. When generating the output, each array element of the snippet should be displayed on a new line with proper indentation. The app checkboxes should be indented under the product checkboxes, and the product checkboxes should be indented under the category checkboxes. When a user selects checkboxes and clicks a "Generate Ticket" button, the system should display a formatted service desk ticket with the snippets of all selected items.

The website should have a clean layout with proper indentation for categories, products, and apps.

The configuration structure should have the following hierarchy:
- Categories contain Products.
- Products contain Apps.

Each category, product, and app has a corresponding snippet that will appear in the generated ticket.

**Structure:**
- **Category:**
  - **Product:**
    - **App:**

---

This prompt instructs the generation of a multi-level UI with proper indentation, checkboxes, hardcoded configuration, and formatted output when generating a service desk ticket.