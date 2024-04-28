import { IonCol, IonLabel, IonRow } from "@ionic/react";
import { forwardRef } from "react";
import { FieldErrors } from "react-hook-form";
import { SignUpType } from "../pages/Signup";
import Input, { InputProps } from "./Input";

interface InputRowProps {
  label: string;
  hintText?: string;
  input: InputProps;
  errors: FieldErrors<SignUpType>;
  name: keyof SignUpType;
}

const InputRow = forwardRef<JSX.Element, InputRowProps>((props, ref) => {

  return (
    <IonRow style={{ marginTop: '24px' }} >
      <IonCol>
        <div>
          <IonLabel>{props.label}</IonLabel>
          <div style={{ marginTop: '8px', border: props.errors[props.name] ? "1px solid red" : "none" }} >
            <Input {...props.input} />
          </div>
          {props.hintText ? <p style={{ fontSize: "14px", marginTop: '8px' }}>{props.hintText}</p> : null}
        </div>
      </IonCol>
    </IonRow>
  )
});

export default InputRow;