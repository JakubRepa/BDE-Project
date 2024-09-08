// colorPicker.ts

// Function to change the background color of the page based on the color picker value
const changeBackgroundColor = (color: string): void => {
    document.body.style.backgroundColor = color;
  };
  
  // Function to initialize the color picker event listener
  const initializeColorPicker = (): void => {
    const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
    if (colorPicker) {
      colorPicker.addEventListener('input', (event: Event) => {
        const target = event.target as HTMLInputElement;
        changeBackgroundColor(target.value); // Change background color when user selects a color
      });
    } else {
      console.error('Color picker element not found');
    }
  };
  
  // Initialize color picker when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    initializeColorPicker();
  });
  