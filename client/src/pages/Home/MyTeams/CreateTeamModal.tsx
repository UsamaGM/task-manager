import {
  FormContainer,
  SubmitButton,
  TextAreaWithLabel,
  TextInputWithLabel,
} from "@/components";
import { useTeam } from "@/contexts/TeamContext";
import { formErrorsHandler } from "@/helpers/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { animate } from "animejs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}

function CreateTeamModal({ isOpen, onClose }: PropTypes) {
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
    animate(".form-container", {
      translateY: 25,
      duration: 500,
    });
    return () => {
      animate(".form-container", {
        translateY: -25,
        duration: 500,
      });
    };
  }, [isOpen]);

  async function onSubmit(formData: any) {
    await createTeam(formData.name, formData.description);

    handleClose();
  }

  function handleClose() {
    reset();
    onClose();
  }

  if (!isOpen) return null;

  const isError = formErrorsHandler(errors);

  return (
    <div className="absolute inset-0 bg-black/25 flex items-center justify-center z-50 p-4">
      <FormContainer
        title="Create Team"
        onSubmit={handleSubmit(onSubmit)}
        isError={!!isError}
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
          <button
            type="button"
            onClick={handleClose}
            className="hover:bg-red-200 hover:text-red-800 px-3 py-2 rounded-lg hover:shadow cursor-pointer"
          >
            Cancel
          </button>
          <SubmitButton title="Create Team" />
        </div>
      </FormContainer>
    </div>
  );
}

export default CreateTeamModal;
