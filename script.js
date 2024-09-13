// Updated configuration for three levels: Category, Product, and App
const configuration = [
    {
      category: 'Software',
      snippet: ['Software category selected', 'This includes office and design tools.'],
      products: [
        {
          name: 'Office Suite',
          snippet: ['Office Suite product selected', 'This suite includes word processing and spreadsheet tools.'],
          apps: [
            { name: 'Word Processor', snippet: ['Word Processor app selected', 'Includes document editing features.'] },
            { name: 'Spreadsheet', snippet: ['Spreadsheet app selected', 'Includes advanced data analysis features.'] }
          ]
        },
        {
          name: 'Design Tools',
          snippet: ['Design Tools product selected', 'This suite includes photo editing and vector graphics tools.'],
          apps: [
            { name: 'Photo Editor', snippet: ['Photo Editor app selected', 'Includes filters and adjustments.'] },
            { name: 'Vector Graphics Editor', snippet: ['Vector Graphics Editor app selected', 'Supports vector illustrations.'] }
          ]
        }
      ]
    },
    {
      category: 'Hardware',
      snippet: ['Hardware category selected', 'This includes computers and accessories.'],
      products: [
        {
          name: 'Computers',
          snippet: ['Computers product selected', 'Includes laptops and desktops.'],
          apps: [
            { name: 'Laptop', snippet: ['Laptop app selected', 'Portable and lightweight.'] },
            { name: 'Desktop', snippet: ['Desktop app selected', 'High performance for heavy tasks.'] }
          ]
        },
        {
          name: 'Accessories',
          snippet: ['Accessories product selected', 'Includes keyboards and mice.'],
          apps: [
            { name: 'Keyboard', snippet: ['Keyboard app selected', 'Ergonomic and responsive keys.'] },
            { name: 'Mouse', snippet: ['Mouse app selected', 'High precision and adjustable DPI.'] }
          ]
        }
      ]
    }
  ];
  
  // Function to dynamically create the UI
  function createUI() {
    const categoryList = document.getElementById('category-list');
  
    configuration.forEach((category, catIndex) => {
      // Create category checkbox
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('category');
      const categoryCheckbox = document.createElement('input');
      categoryCheckbox.type = 'checkbox';
      categoryCheckbox.id = `category-${catIndex}`;
      categoryCheckbox.onchange = (event) => toggleCategory(event, catIndex);
      const categoryLabel = document.createElement('label');
      categoryLabel.htmlFor = `category-${catIndex}`;
      categoryLabel.textContent = category.category;
      categoryDiv.appendChild(categoryCheckbox);
      categoryDiv.appendChild(categoryLabel);
      categoryList.appendChild(categoryDiv);
  
      // Create product checkboxes under each category
      category.products.forEach((product, prodIndex) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        const productCheckbox = document.createElement('input');
        productCheckbox.type = 'checkbox';
        productCheckbox.id = `product-${catIndex}-${prodIndex}`;
        productCheckbox.onchange = (event) => toggleProduct(event, catIndex, prodIndex);
        const productLabel = document.createElement('label');
        productLabel.htmlFor = `product-${catIndex}-${prodIndex}`;
        productLabel.textContent = product.name;
        productDiv.appendChild(productCheckbox);
        productDiv.appendChild(productLabel);
        categoryList.appendChild(productDiv);
  
        // Create app checkboxes under each product
        product.apps.forEach((app, appIndex) => {
          const appDiv = document.createElement('div');
          appDiv.classList.add('app');
          const appCheckbox = document.createElement('input');
          appCheckbox.type = 'checkbox';
          appCheckbox.id = `app-${catIndex}-${prodIndex}-${appIndex}`;
          const appLabel = document.createElement('label');
          appLabel.htmlFor = `app-${catIndex}-${prodIndex}-${appIndex}`;
          appLabel.textContent = app.name;
          appDiv.appendChild(appCheckbox);
          appDiv.appendChild(appLabel);
          categoryList.appendChild(appDiv);
        });
      });
    });
  }
  
  // Toggle all product and app checkboxes when the category checkbox is clicked
  function toggleCategory(event, categoryIndex) {
    const isChecked = event.target.checked;
    const category = configuration[categoryIndex];
  
    category.products.forEach((product, prodIndex) => {
      document.getElementById(`product-${categoryIndex}-${prodIndex}`).checked = isChecked;
  
      product.apps.forEach((app, appIndex) => {
        document.getElementById(`app-${categoryIndex}-${prodIndex}-${appIndex}`).checked = isChecked;
      });
    });
  }
  
  // Toggle all app checkboxes when the product checkbox is clicked
  function toggleProduct(event, categoryIndex, productIndex) {
    const isChecked = event.target.checked;
    const product = configuration[categoryIndex].products[productIndex];
  
    product.apps.forEach((app, appIndex) => {
      document.getElementById(`app-${categoryIndex}-${productIndex}-${appIndex}`).checked = isChecked;
    });
  }
  
  // Function to concatenate an array of snippet strings into formatted lines
  function formatSnippet(snippetArray) {
    return snippetArray.map(line => `      ${line}`).join('\n'); // Adds indent and joins lines with newline
  }
  
  // Generate the service desk ticket description
  function generateTicket() {
    let ticketDescription = '';
  
    configuration.forEach((category, catIndex) => {
      const isCategoryChecked = document.getElementById(`category-${catIndex}`).checked;
  
      // Add category if selected
      let categoryHasSelectedProducts = false;
      let categoryDescription = '';
  
      category.products.forEach((product, prodIndex) => {
        const isProductChecked = document.getElementById(`product-${catIndex}-${prodIndex}`).checked;
  
        let productHasSelectedApps = false;
        let productDescription = '';
  
        product.apps.forEach((app, appIndex) => {
          const isAppChecked = document.getElementById(`app-${catIndex}-${prodIndex}-${appIndex}`).checked;
          if (isAppChecked) {
            productHasSelectedApps = true;
            productDescription += `      App: ${app.name}\n${formatSnippet(app.snippet)}\n`; // Indented app with snippet
          }
        });
  
        if (isProductChecked || productHasSelectedApps) {
          categoryHasSelectedProducts = true;
          categoryDescription += `\n    Product: ${product.name}\n`; // Product level
          categoryDescription += formatSnippet(product.snippet) + '\n'; // Product snippet (array)
          categoryDescription += productDescription; // Append app snippets
        }
      });
  
      if (isCategoryChecked || categoryHasSelectedProducts) {
        ticketDescription += `\nCategory: ${category.category}\n`; // Add category name
        ticketDescription += formatSnippet(category.snippet) + '\n'; // Category snippet (array)
        ticketDescription += categoryDescription; // Append product and app descriptions
      }
    });
  
    // Display the ticket description or a fallback message
    document.getElementById('ticket-output').textContent = ticketDescription.trim() || 'No items selected.';
    
    // Ensure proper formatting is maintained in the output (newlines)
    document.getElementById('ticket-output').style.whiteSpace = 'pre-wrap';
  }
  
  // Initialize UI on page load
  window.onload = createUI;
  