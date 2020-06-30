# Implementing a form     

Form components are split between 2 imports:

- `Form`: this handles the implementation of the <form> component, state management and validation.
- `FormElements`: this contains implementations of individual form elements <input> etc.

## Setting up the form:

Form has 2 required props: 
    - onSubmitFn 
    - validationSchema

```tsx
import Form from "../components/ReactHookForm/Form";
import * as yup from "yup";

const validationSchema = {
    email: yup.string().email().required()
}

const SomeComponent = () => {
    const submitHandler = (data) => {
        // do something with data
    }

    return (     
        <Form 
            // the onSubmitFn is wrapped in a function from 
            // react-hook-form internally this handles validations
            onSubmitFn={submitHandler} 

            // takes a `yup` schema defining the requirements for each field
            // the schema can be passed in as an object (as above)
            // internally the schema is wrapped with yup.object().shape()
            validationSchema={validationSchema}
        >

            {/* children */}

        </Form>
    )
}
```

The `Form` component passes the `register` function (from react-hook-form), as context to it's children where it is registered as a `ref`.

This means form state can be managed using the `name` prop on each child component.

When the form is submitted an object containing the state is passed to the submitHandler function.

e.g. 
```{
    email: "blabla@bla.com"
}
```


Each child also receives as errors object via context meaning they can render error infomation based on the validationSchema.

## Setting up children:

The `<Form />` components exports 3 child components:

### Form Header
Displays a title at the top of the form component

```tsx
<FormHeader 
    title="Form Title"
/>
```

### Form Contents
Contains the forms Inputs passed as children

```tsx
<FormContents>
    {children}
<FormContents>
```

### Form footer
Contains the "Submit" form button and "Close" button (The close button is used if displayed as a modal and displayed if an onClose function is passed)

```tsx
<FormFooter
    // defaults to "Submit" if omitted
    submitButtonText="Add New User"
    // takes a function to close the modal
    // no button is rendered if omitted
    onClose={() => {}}
/>
```

Adding Children:

```tsx
    const SomeComponent = () => {
    const submitHandler = (data) => {
        // do something with data
    }

    const handleClose = () => {
        // close a modal
    }

    return (     
        <Form         
            onSubmitFn={submitHandler} 
            validationSchema={validationSchema}
        >
            <FormHeader title="A form" />

            <FormContents>
                {/* inputs */}
            </FormContents>

             <FormFooter onClose={handleClose} />
        </Form>
    );
}
```

## Adding inputs

Form Elements contains implimentation of input fields with labels and error handling.

They also use the `react-hook-form` `register` function which they receive via context - this allows their state and any errors to be managed by `react-hook-form`.

To use an input simply import it and use it as a child of FormContents.

Each input requires a `name` and a `title` prop.

The `title` will be displayed as the inputs label, and the `name` will be used the register the input for state management.

When the `submitHandler` is called the inputs state will appear as a value on the state object with the name as it's key.

### FormInput
```tsx
<FormInput
    name="email"
    type="email"
    title="Email Address"
    placeholder="email@domain.com"
/>
```

### RadioInputGroup
```tsx
<RadioInputGroup
    title="Role"
    name="role"
    inputs={[
        { value: "admin", label: "Admin", defaultChecked: true },
        { value: "station_owner", label: "Station Owner" },
        { value: "insights_only", label: "Insights Only" },
    ]}
/>
```

### Complete example

```tsx
import Form from "../components/ReactHookForm/Form";
import * as yup from "yup";

const validationSchema = {
    email: yup.string().email().required()
}

const SomeComponent = () => {
    const submitHandler = (data) => {
        // will be called with an object with email as a key:
        // {
        //     email: "blabla@bla.com"
        // }
    }

    return (     
        <Form           
            onSubmitFn={submitHandler} 
            validationSchema={validationSchema}
        >
            <FormHeader title="A form" />

            <FormContents>
                <FormInput
                    name="email"
                    type="email"
                    title="Email Address"
                    placeholder="email@domain.com"
                />
            </FormContents>

             <FormFooter submitButtonText="Add a user" onClose={handleClose} />

        </Form>
    )
}
```