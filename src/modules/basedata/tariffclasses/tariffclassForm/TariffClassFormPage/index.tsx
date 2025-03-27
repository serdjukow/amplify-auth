import React, { useRef, useState } from "react";
import { Grid2 } from "@mui/material";
import {
  useAuthContext,
  useLayoutContext,
  useTariffClassCreate,
  useTariffClassRead,
  useTariffClassRoutes,
  useTariffClassUpdate,
} from "hooks";
import { BoxHeadlineContainer } from "layout";
import { TariffClassFormHandles } from "types";
import { CustomButton } from "core";
import { BoxLoadingForm } from "components";
import TariffClassForm from "../TariffClassForm";
import useStyles from "./styles";

type TariffClassFormPageProps = {
  formIntent: "create" | "edit";
};

const TariffClassFormPage: React.FC<TariffClassFormPageProps> = ({
  formIntent,
}) => {
  const { classes } = useStyles();
  const authContext = useAuthContext();
  const { notify } = useLayoutContext();

  const { tariffClass, isLoading } = useTariffClassRead();
  const createTariffClassMutation = useTariffClassCreate();
  const updateTariffClassMutation = useTariffClassUpdate();
  const { navigateToTariffClassPage, navigateToTariffClassListPage } =
    useTariffClassRoutes();

  const tariffClassFormRef = useRef<TariffClassFormHandles>(null);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const submitTariffClass = async () => {
    const tariffClassFormInput =
      tariffClassFormRef.current?.validateTariffClassForm();
    if (!tariffClassFormInput) {
      console.error("TariffClassForm is invalid...");
      return;
    }

    if (!authContext.userData) {
      return notify(
        `Beim ${
          formIntent === "edit" ? "Bearbeiten" : "Anlegen"
        } einer Tarifklasse ist ein Fehler aufgetreten.`,
      );
    }

    setSubmitLoading(true);

    console.log("tariffClassInput: ", tariffClassFormInput);

    const mutateTariffClassRequest = tariffClass
      ? await updateTariffClassMutation.mutateAsync({
          ...tariffClassFormInput,
          id: tariffClass.id,
        })
      : await createTariffClassMutation.mutateAsync(tariffClassFormInput);

    if (!mutateTariffClassRequest) {
      setSubmitLoading(false);
      return notify(
        `Beim ${
          formIntent === "edit" ? "Bearbeiten" : "Anlegen"
        } einer Tarifklasse ist ein Fehler aufgetreten.`,
      );
    }

    console.log("mutateTariffClassRequest: ", mutateTariffClassRequest);

    tariffClassFormRef.current?.resetTariffClassForm();

    setSubmitLoading(false);
    navigateToTariffClassPage(mutateTariffClassRequest);
  };

  if (isLoading) {
    return (
      <BoxLoadingForm
        isLoading={isLoading}
        entityName="Tarifklasse"
        formIntent={formIntent}
      />
    );
  }

  return (
    <BoxHeadlineContainer
      boxTitle={
        "Tarifklasse " + (formIntent === "edit" ? "bearbeiten" : "anlegen")
      }
    >
      <TariffClassForm
        tariffClass={tariffClass}
        formIntent={formIntent}
        ref={tariffClassFormRef}
      />

      <Grid2 container direction="row" className={classes.buttons}>
        <Grid2 className={classes.gridItem}>
          <CustomButton
            text={
              "Tarifklasse " + (formIntent === "edit" ? "speichern" : "anlegen")
            }
            onClick={() => submitTariffClass()}
            loading={submitLoading}
            accessKey="s"
          />
        </Grid2>
        <Grid2 className={classes.gridItem}>
          <CustomButton
            color="red"
            text="Abbrechen"
            accessKey="a"
            onClick={navigateToTariffClassListPage}
            disabled={submitLoading}
          />
        </Grid2>
      </Grid2>
    </BoxHeadlineContainer>
  );
};

export default TariffClassFormPage;
