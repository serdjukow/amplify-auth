import React, { useRef, useState } from "react";
import { Grid2 } from "@mui/material";
import {
  useAuthContext,
  useLayoutContext,
  useStaffTypeCreate,
  useStaffTypeRead,
  useStaffTypeRoutes,
  useStaffTypeUpdate,
} from "hooks";
import { BoxHeadlineContainer } from "layout";
import { StaffTypeFormHandles } from "types";
import { CustomButton } from "core";
import { BoxLoadingForm } from "components";
import StaffTypeForm from "../StaffTypeForm";
import useStyles from "./styles";

type StaffTypeFormPageProps = {
  formIntent: "create" | "edit";
};

const StaffTypeFormPage: React.FC<StaffTypeFormPageProps> = ({
  formIntent,
}) => {
  const { classes } = useStyles();
  const authContext = useAuthContext();
  const { notify } = useLayoutContext();

  const { staffType, isLoading } = useStaffTypeRead();
  const createStaffTypeMutation = useStaffTypeCreate();
  const updateStaffTypeMutation = useStaffTypeUpdate();
  const { navigateToStaffTypePage, navigateToStaffTypeListPage } =
    useStaffTypeRoutes();

  const staffTypeFormRef = useRef<StaffTypeFormHandles>(null);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const submitStaffType = async () => {
    const staffTypeFormInput =
      staffTypeFormRef.current?.validateStaffTypeForm();
    if (!staffTypeFormInput) {
      console.error("StaffTypeForm is invalid...");
      return;
    }

    if (!authContext.userData) {
      return notify(
        `Beim ${
          formIntent === "edit" ? "Bearbeiten" : "Anlegen"
        } einer Personalart ist ein Fehler aufgetreten.`,
      );
    }

    setSubmitLoading(true);

    console.log("staffTypeInput: ", staffTypeFormInput);

    const mutateStaffTypeRequest = staffType
      ? await updateStaffTypeMutation.mutateAsync({
          ...staffTypeFormInput,
          id: staffType.id,
        })
      : await createStaffTypeMutation.mutateAsync(staffTypeFormInput);

    if (!mutateStaffTypeRequest) {
      setSubmitLoading(false);
      return notify(
        `Beim ${
          formIntent === "edit" ? "Bearbeiten" : "Anlegen"
        } einer Personalart ist ein Fehler aufgetreten.`,
      );
    }

    console.log("mutateStaffTypeRequest: ", mutateStaffTypeRequest);

    staffTypeFormRef.current?.resetStaffTypeForm();

    setSubmitLoading(false);
    navigateToStaffTypePage(mutateStaffTypeRequest);
  };

  if (isLoading) {
    return (
      <BoxLoadingForm
        isLoading={isLoading}
        entityName="Personalart"
        formIntent={formIntent}
      />
    );
  }

  return (
    <BoxHeadlineContainer
      boxTitle={
        "Personalart " + (formIntent === "edit" ? "bearbeiten" : "anlegen")
      }
    >
      <StaffTypeForm
        staffType={staffType}
        formIntent={formIntent}
        ref={staffTypeFormRef}
      />

      <Grid2 container direction="row" className={classes.buttons}>
        <Grid2 className={classes.gridItem}>
          <CustomButton
            text={
              "Personalart " + (formIntent === "edit" ? "speichern" : "anlegen")
            }
            onClick={() => submitStaffType()}
            loading={submitLoading}
            accessKey="s"
          />
        </Grid2>
        <Grid2 className={classes.gridItem}>
          <CustomButton
            color="red"
            text="Abbrechen"
            accessKey="a"
            onClick={navigateToStaffTypeListPage}
            disabled={submitLoading}
          />
        </Grid2>
      </Grid2>
    </BoxHeadlineContainer>
  );
};

export default StaffTypeFormPage;
