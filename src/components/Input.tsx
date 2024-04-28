import { IonInput, IonInputPasswordToggle } from "@ionic/react";
import { forwardRef, useState } from "react";

export type InputType = "date" | "datetime-local" | "email" | "month" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" | "week"

export type InputProps = InputBaseProps | InputPasswordProps;

type InputBaseProps = {
    value?: string | number;
    onChange?: (e: any) => void;
    placeholder?: string;
    type?: InputType;
    required?: boolean;
    errorText?: string;
}

type InputPasswordProps = InputBaseProps & {
    type: 'password';
    passwordToggle: boolean;
}

const Input = forwardRef<HTMLIonInputElement, InputProps>(({ onChange, ...props }, ref) => {
    const [isTouched, setIsTouched] = useState(false);

    const markTouched = () => {
        setIsTouched(true);
    };

    const style = {
        padding: '15px !important',
        borderRadius: '10px',
        backgroundColor: '#fff',
        border: '1.5px solid #C2C3C4',
        outline: 'none',
        width: '100%',
        height: '48px',
        marginBottom: props.errorText ? '35px' : 0
    }
    return (
        <IonInput ref={ref} counter={true} onIonInput={onChange} className={`custom ${props.errorText && 'ion-invalid'} ${isTouched && 'ion-touched'} `} style={style} {...props}>
            {props.type === 'password' && (props as InputPasswordProps).passwordToggle && <IonInputPasswordToggle color="dark" slot="end" showIcon="eye-outline" hideIcon="eye-off-outline"></IonInputPasswordToggle>}
        </IonInput>
    )
});

export default Input;