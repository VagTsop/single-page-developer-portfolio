# Frontend Mentor - Single-page developer portfolio

![Design preview for the Single-page developer portfolio coding challenge](./preview.jpg)

## The challenge

Your challenge is to build out this single-page portfolio and get it looking as close to the design as possible.

I could use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to:

- Receive an error message when the `form` is submitted if:
  - Any field is empty
  - The email address is not formatted correctly
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

## Technologies used

For this simple simple page project I used only **HTML** and **CSS**. A simple form validation was enough. I used __required__ attribute on inputs and put the right type on them. 

For example. The code:

```<input type="email" name="email" id="email" placeholder="EMAIL" aria-label="Email" inputmode="email" required>```

The **type="email"** make the user type a valid email with @. Without it, the submit don't occur. A real word application with react, I would use __react-hook-form__ for it. To handle validation and error messages. However, this project was a simple one to train HTML and CSS.

## Thank you

Any tips are welcome. Thank you very much. 😁