import React, { Component } from "react";
import  styled  from  'styled-components';
import { FormButtonComponent} from "./Button";



const Container = styled.div <{}>`
    border-radius: 5px;
    padding: 20px;
    }`;

const FormLayout = styled.form <{}>`
    
    }`;

const LabelLayout = styled.label <{}>`
    display: block;
    }`;


const InputLayout = styled.input <{}>`
    color: palevioletred;
    font-size: 1em;
    border: 2px solid palevioletred;
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
    
    }`;

const MessageInputLayout = styled(InputLayout) <{}>`
    height: 100px;
    }`;


//^[\S\s]{1,35}$

export const FormComponent: React.FunctionComponent = ({  children }) => {

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleSubmit = async (event: any) => {

        event.preventDefault();
        try {
            const body = {email, name, phone, message}
            //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX")
            //console.log(JSON.stringify(body))
            const response = await fetch("http://localhost:5000/todos",
                {
                    method: "POST",
                    headers: { "Content-Type":
                    "application/json" },
                    body: JSON.stringify(body)
                });

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
        <Container>

        <FormLayout id={"contact"} onSubmit={handleSubmit}>
            <h1>Get in Touch!</h1>

            <LabelLayout>
                Email:
                <InputLayout
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required />
            </LabelLayout>

            <LabelLayout>
                Name:
                <InputLayout
                    name="name"
                    type="name"
                    value={name}
                    onChange={e => setName(e.target.value)}/>
            </LabelLayout>

            <LabelLayout>
                Phone:
                <InputLayout
                    name="tel"
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}/>
            </LabelLayout>

            <LabelLayout>
                Message:
                <MessageInputLayout
                    name="message"
                    type="message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required />
            </LabelLayout>

            <FormButtonComponent background_={"green"} color_={"purple"}  text_={"Submit"} />
        </FormLayout>
        </Container>
    );
}