import React, { Component } from "react";
import  styled  from  'styled-components';
import { FormButtonComponent} from "./Button";
import Theme from "./Theme";

const FormLayout = styled.form <{}>`
    width: 42%;
    float: right;
    padding: 20px;
    border: 2px solid ${Theme.color.primary};
    top: 0;
    min-height: 43vh;
    background-color: ${Theme.color.secondary};
    border-radius: 15px;
    }`;


const InputLayout = styled.input <{}>`
    font-size: 1em;
    border-radius: 3px;
    padding: 12px;
    box-sizing: border-box;
    word-break: break-word;
    display: block;
    
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    text-align: left;
    height: 3.5vh;
    
    }`;

const MessageInputLayout = styled(InputLayout) <{}>`
    height: 10vh;
    }`;


export const FormComponent: React.FunctionComponent = ({  children }) => {

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleSubmit = async (event: any) => {

        event.preventDefault();
        try {
            const body = {email, name, phone, message}
            const response = await fetch("http://localhost:5000/todos",
                {
                    method: "POST",
                    headers: { "Content-Type":
                    "application/json" },
                    body: JSON.stringify(body)
                });
            setPhone("");
            setMessage("");
            setEmail("");
            setMessage("");
            alert("Submitted! I will be in touch as soon as possible.");

        } catch (e) {
            console.error(e.message)
        }
        console.log(`
      Email: ${email}
      Name: ${name}
      Phone: ${phone}
      Message: ${message}
    `);

    }


    return (

        <FormLayout id={"contact"} onSubmit={handleSubmit}>
                <InputLayout
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={"Email*"}
                    required />
                <InputLayout
                    name="name"
                    type="name"
                    value={name}
                    placeholder={"Name"}
                    onChange={e => setName(e.target.value)}/>

                <InputLayout
                    name="tel"
                    type="tel"
                    value={phone}
                    placeholder={"Phone #"}
                    onChange={e => setPhone(e.target.value)}/>

                <MessageInputLayout
                    name="message"
                    type="message"
                    value={message}
                    placeholder={"Message*"}
                    onChange={e => setMessage(e.target.value)}
                    required />


            <FormButtonComponent text_={"Submit contact info"} />

        </FormLayout>
    );
}