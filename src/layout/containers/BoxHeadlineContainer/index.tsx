import { CSSProperties, FC, ReactNode, RefObject } from "react";
import { Typography } from "@mui/material";
import { SimpleLineLockIcon } from "icons";
import { Loading } from "core";
import BoxContainer from "../BoxContainer";
import useStyles from "./styles";

type BoxHeadlineContainerProps = {
  boxTitle: ReactNode;
  boxTitleSize?: "xsmall" | "small" | "medium" | "big";
  boxTitlePaddingHorizontal?: number;
  boxSubTitle?: ReactNode;
  boxSubTitleSize?: "small" | "medium" | "big";
  boxID?: string;
  isLoading?: boolean;
  boxBackground?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
  boxMenu?: ReactNode;
  boxIcon?: ReactNode;
  boxDisabled?: boolean;
  boxDisabledText?: ReactNode;
  boxDisabledIconSize?: "small" | "medium" | "big";
  boxCollapsed?: boolean;
  children?: ReactNode;
  inBox?: boolean;
  marginTop?: boolean;
  marginBottom?: number;
  tabBoxValue?: number;
  tabBoxIndex?: number;
  className?: string;
  boxContentClassName?: string;
  boxContentMaxWidth?: number | string;
  boxWidth?: number | "full" | "xs" | "sm" | "md" | "lg" | "xl";
  boxMinWidth?: number | "xs" | "sm" | "md" | "lg" | "xl" | (string & {});
  boxAlignment?: "center" | "flex-start" | "flex-end";
  style?: CSSProperties;
  ref?: RefObject<HTMLDivElement>;
};

const BoxHeadlineContainer: FC<BoxHeadlineContainerProps> = ({
  boxTitle,
  boxTitleSize = "medium",
  boxTitlePaddingHorizontal = 20,
  boxSubTitle,
  boxSubTitleSize = "medium",
  boxID,
  isLoading = false,
  boxBackground = false,
  paddingHorizontal = boxTitleSize === "big"
    ? 40
    : boxTitleSize === "medium"
      ? 30
      : 20,
  paddingVertical = 30,
  boxMenu,
  boxIcon,
  boxDisabled,
  boxDisabledText,
  boxDisabledIconSize = "big",
  boxCollapsed,
  children,
  inBox = false,
  tabBoxValue,
  tabBoxIndex,
  marginTop = true,
  marginBottom,
  className,
  boxContentClassName,
  boxContentMaxWidth,
  boxWidth,
  boxMinWidth,
  boxAlignment,
  style,
  ref,
}) => {
  const inTab = tabBoxValue !== undefined;

  const { classes, cx } = useStyles({
    boxTitleSize,
    paddingHorizontal,
    paddingVertical,
    boxBackground,
    inTab: inTab,
    inBox: inBox,
    boxCollapsed: boxCollapsed,
  });

  if (tabBoxValue !== undefined && tabBoxValue !== tabBoxIndex) {
    return null;
  }

  return (
    <BoxContainer
      className={cx(classes.boxContainer, className)}
      style={{
        marginTop: inTab ? "unset" : marginTop ? 45 : "unset",
        marginBottom: marginBottom,
        ...style,
      }}
      inTab={inTab}
      inBox={inBox}
      boxWidth={boxWidth}
      boxMinWidth={boxMinWidth}
      boxAlignment={boxAlignment}
      boxCollapsed={boxCollapsed}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      boxID={boxID}
      ref={ref}
    >
      <div
        className={classes.headline}
        style={{
          paddingTop: boxTitlePaddingHorizontal,
          paddingBottom: boxTitlePaddingHorizontal,
        }}
      >
        <Typography
          className={classes.boxTitle}
          variant={
            boxTitleSize === "small" || boxTitleSize === "xsmall"
              ? "h5"
              : boxTitleSize === "big"
                ? "h3"
                : "h4"
          }
        >
          {boxIcon && <span className={classes.boxIcon}>{boxIcon}</span>}
          {boxTitle}
          {boxSubTitle && (
            <>
              <span className={classes.divider}>|</span>
              <span
                className={cx(
                  classes.boxSubTitle,
                  boxSubTitleSize === "small"
                    ? classes.boxSubTitleSmall
                    : boxSubTitleSize === "big"
                      ? classes.boxSubTitleBig
                      : classes.boxSubTitleMedium,
                )}
              >
                {boxSubTitle}
              </span>
            </>
          )}
          {isLoading && (
            <Loading size="20px" style={{ margin: "0px 0px 0px 15px" }} />
          )}
        </Typography>
        <div className={classes.boxMenu}>{boxMenu}</div>
      </div>

      <div
        className={cx(
          classes.boxContent,
          boxContentClassName,
          boxDisabled ? classes.boxDisabled : "",
        )}
        style={{ maxWidth: boxContentMaxWidth }}
      >
        {boxDisabled && (
          <div className={classes.boxDisabledText}>
            <SimpleLineLockIcon
              className={cx(
                classes.boxDisabledIcon,
                boxDisabledIconSize === "small"
                  ? classes.boxDisabledIconSmall
                  : boxDisabledIconSize === "medium"
                    ? classes.boxDisabledIconMedium
                    : classes.boxDisabledIconBig,
              )}
            />
            {boxDisabledText}
          </div>
        )}
        {children}
      </div>
    </BoxContainer>
  );
};

export default BoxHeadlineContainer;
