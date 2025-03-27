import { client } from "queryClient";
import {
  CreateSequentialNumberInput,
  SequentialNumber,
  UpdateSequentialNumberInput,
} from "types";
import { EntityType, getEntityNumberClass } from "../entitynumbers";

export const getFreeEntityNumber = async (
  entityType: EntityType,
  entityPrefix: string,
  occupiedNumbers?: string[],
): Promise<string> => {
  const entityNumberClass = getEntityNumberClass(entityType);

  console.log("entityNumberClass: ", entityNumberClass);

  const sequentialNumber =
    await entityNumberClass.getSequentialNumber(entityPrefix);

  console.log("sequentialNumber is: ", sequentialNumber);
  console.log("occupiedNumbers are: ", occupiedNumbers);

  if (!sequentialNumber) {
    let nextFreeEntityNumber = entityNumberClass.minValue;

    let firstEntityNumber =
      entityPrefix +
      (entityNumberClass.sequentialNumberPrefix + nextFreeEntityNumber).slice(
        entityNumberClass.placesCount * -1,
      );

    const firstNumberIsFree = false;

    do {
      firstEntityNumber =
        entityPrefix +
        (entityNumberClass.sequentialNumberPrefix + nextFreeEntityNumber).slice(
          entityNumberClass.placesCount * -1,
        );

      if (!occupiedNumbers || !occupiedNumbers.includes(firstEntityNumber)) {
        return firstEntityNumber;
      } else {
        nextFreeEntityNumber++;
      }
    } while (!firstNumberIsFree);

    return firstEntityNumber;
  }

  let nextFreeEntityNumber = sequentialNumber.sequentialNumber;

  let fullEntityNumber =
    entityPrefix +
    (entityNumberClass.sequentialNumberPrefix + nextFreeEntityNumber).slice(
      entityNumberClass.placesCount * -1,
    );

  let nummerIsFree = false;

  do {
    fullEntityNumber =
      entityPrefix +
      (entityNumberClass.sequentialNumberPrefix + nextFreeEntityNumber).slice(
        entityNumberClass.placesCount * -1,
      );

    const entityNumberIsFree =
      await entityNumberClass.isEntityNumberFree(fullEntityNumber);

    if (
      entityNumberIsFree &&
      (!occupiedNumbers || !occupiedNumbers.includes(fullEntityNumber))
    ) {
      nummerIsFree = true;
    } else {
      nextFreeEntityNumber++;
    }
  } while (!nummerIsFree);

  return fullEntityNumber;
};

export const getEntityNumberTitle = (entityType: EntityType) => {
  const entityNumberClass = getEntityNumberClass(entityType);

  return entityNumberClass.entityNumberTitle;
};

export const checkAndUpdateEntitySequentialNumber = async (
  entityType: EntityType,
  entityPrefix: string,
  entityNumber: string,
) => {
  const entityNumberClass = getEntityNumberClass(entityType);

  const sequentialOfEntityNumber =
    entityNumberClass.getEntityNumberSequential(entityNumber);

  if (sequentialOfEntityNumber === null) {
    return;
  }

  const sequentialNumber =
    await entityNumberClass.getSequentialNumber(entityPrefix);

  if (!sequentialNumber) {
    await createSequentialNumber({
      id: entityNumberClass.entityPrefixPlaceholder + entityPrefix,
      entityType: entityType,
      sequentialNumber: sequentialOfEntityNumber + 1,
    });
    return;
  }

  if (sequentialNumber.sequentialNumber !== sequentialOfEntityNumber) {
    return;
  }

  const updateSequentialNumberInput: UpdateSequentialNumberInput = {
    id: entityPrefix,
    sequentialNumber: sequentialNumber.sequentialNumber + 1,
  };

  await updateSequentialNumber(updateSequentialNumberInput);
};

export const getSequentialNumber = async (
  sequentialNumberID: string,
): Promise<SequentialNumber | null> => {
  const { data: sequentialNumber } = await client.models.SequentialNumber.get({
    id: sequentialNumberID,
  });

  return sequentialNumber;
};

export const createSequentialNumber = async (
  createSequentialNumberInput: CreateSequentialNumberInput,
) => {
  const { data: newSequentialNumber } =
    await client.models.SequentialNumber.create(createSequentialNumberInput);

  return newSequentialNumber;
};

export const updateSequentialNumber = async (
  updateSequentialNumberInput: UpdateSequentialNumberInput,
) => {
  const { data: updatedSequentialNumber } =
    await client.models.SequentialNumber.update(updateSequentialNumberInput);

  return updatedSequentialNumber;
};
