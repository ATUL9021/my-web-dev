import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useForm } from "react-hook-form";
import { useUpdateSetting } from "./useEditSettings";
function UpdateSettingsForm() {
  const { isLoading, settings, error } = useSettings();
  const { isUpdating, mutateSetting } = useUpdateSetting();
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if (isLoading) return <Spinner />;
  console.log(settings);
  const {
    minBookingLength,
    maxBookingLength,
    maxNumberOfGuestsPerBooking,
    breakfastPrice,
  } = settings;

  function onHandleSubmit(e, id) {
    const value = e.target.value;
    console.log("M vale", value);
    if (!value) return;
    mutateSetting({ [id]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          onBlur={(e) => onHandleSubmit(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={(e) => onHandleSubmit(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxNumberOfGuestsPerBooking"
          defaultValue={maxNumberOfGuestsPerBooking}
          onBlur={(e) => onHandleSubmit(e, "maxNumberOfGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={(e) => onHandleSubmit(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
