import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Description from './Description';

describe('Description Component Initial Render', () => {
  const dummyHtml = '<strong>This is my product text</strong>';

  it('shows the "Read More" button on the screen', () => {
    // 1. Render your component to the virtual screen
    render(<Description htmlContent={dummyHtml} />);
    
    // 2. Look for the button using the text visible to the user
    const button = screen.getByText('Read More');
    
    // 3. Check if the button is successfully found
    expect(button).toBeDefined();
  });

  it('renders the HTML product content safely', () => {
    render(<Description htmlContent={dummyHtml} />);
    
    // 4. Verify that your HTML content actually made it to the screen
    const rawText = screen.getByText('This is my product text');
    expect(rawText).toBeDefined();
  });
});
