import {
  SubmitButton,
  TextAreaWithLabel,
  TextInputWithLabel,
} from "@/components";
import CancelButton from "@/components/CancelButton";
import ModalContainer from "@/components/ModalContainer";
import { useTeam } from "@/contexts/TeamContext";
import { formErrorsHandler } from "@/helpers/errorHandler";
import { ModalPropTypes } from "@/helpers/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { animate } from "animejs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function CreateTeamModal({ isOpen, onClose }: ModalPropTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const { createTeam } = useTeam();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be 3 characters or more"),
    description: z
      .string()
      .min(20, "Description must be 20 characters or more"),
  });

  type formType = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    animate(".base-container", {
      translateY: [-50, 0],
      duration: 500,
    });
  }, [isOpen]);

  async function onSubmit(formData: any) {
    setIsLoading(true);
    await createTeam(formData.name, formData.description);
    setIsLoading(false);

    handleClose();
  }

  function handleClose() {
    reset();
    onClose();
  }

  if (!isOpen) return null;

  const isError = formErrorsHandler(errors);
  if (isError) {
    animate(".base-container", {
      translateX: [-25, 25, -25, 25, 0],
      duration: 500,
    });
  }

  return (
    <ModalContainer title="Create Team">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <TextInputWithLabel
          label="Team Name"
          id="name"
          placeholder="Frontend Dev Team"
          hint="Should be short and to the point"
          {...register("name")}
        />
        <TextAreaWithLabel
          label="Team Description"
          id="description"
          placeholder="We are a group of ..."
          hint="Should be descriptive so that readers can understand the purpose of your team"
          {...register("description")}
        />
        <div className="flex justify-center items-center space-x-4">
          <CancelButton onClick={handleClose} />
          <SubmitButton isLoading={isLoading} title="Create Team" />
        </div>
      </form>
    </ModalContainer>
  );
}

export default CreateTeamModal;
