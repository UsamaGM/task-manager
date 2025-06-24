import {
  SubmitButton,
  TextAreaWithLabel,
  TextInputWithLabel,
} from "@/components";
import ModalContainer from "@/components/ModalContainer";
import { useTeam } from "@/contexts/TeamContext";
import { formErrorsHandler } from "@/helpers/errorHandler";
import { TeamType } from "@/helpers/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { animate } from "animejs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface PropTypes {
  isOpen: boolean;
  team: TeamType;
  onClose: () => void;
}

function EditTeamModal({ isOpen, team, onClose }: PropTypes) {
  useEffect(() => {
    if (isOpen) {
      animate(".base-container", {
        translateY: [-50, 0],
        duration: 400,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalContainer title={`Edit Team Data for ${team.name}`}>
      <EditForm team={team} onClose={onClose} />
    </ModalContainer>
  );
}

export default EditTeamModal;

interface FormPropTypes {
  team: TeamType;
  onClose: () => void;
}

function EditForm({ team, onClose }: FormPropTypes) {
  const { updateTeamData } = useTeam();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(3, "Minimum 3 characters for name"),
    description: z.string().min(20, "Minimum 20 characters for description"),
  });

  type formDataTypes = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formDataTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: team.name,
      description: team.description,
    },
  });

  async function onSubmit(formData: { name: string; description: string }) {
    const hasDataChanged =
      team.name !== formData.name.trim() ||
      team.description !== formData.description.trim();

    if (!hasDataChanged) {
      toast.error("You did not change anything");
      return;
    }

    setIsLoading(true);
    await updateTeamData(team._id, formData);
    setIsLoading(false);
    reset();
    onClose();
  }

  function handleClose() {
    reset();
    onClose();
  }

  const isError = !!formErrorsHandler(errors);
  if (isError) {
    animate(".form-container", {
      translateX: [-25, 25, -25, 25, 0],
      duration: 500,
      ease: "inOutBounce",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-container flex flex-col space-y-4 w-full"
    >
      <TextInputWithLabel
        label="Team Name"
        id="name"
        placeholder="Team Frontend Masters"
        hint="Should be short and to the point"
        {...register("name")}
      />
      <TextAreaWithLabel
        label="Team Description"
        id="description"
        placeholder="A team dedicated to..."
        hint="Should be descriptive and explain the purpose of the team"
        {...register("description")}
      />
      <div className="flex space-x-5">
        <button
          type="button"
          onClick={handleClose}
          className="w-full hover:bg-red-200 hover:text-red-700 transition-colors duration-300 rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <SubmitButton isLoading={isLoading} title="Update Team Data" />
      </div>
    </form>
  );
}
