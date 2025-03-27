import React from "react";
import { CircularProgress } from "@mui/material";
import styles from "./styles.module.css"
import { clsx } from "clsx"

type LoadingProps = {
  description?: React.ReactNode;
  className?: string;
  size?: string;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
};

const Loading: React.FC<LoadingProps> = ({
  description,
  className,
  size,
  align = "center",
  style,
}) => {
  return (
      <div
          style={{
              justifyContent: align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
              marginTop: 50,
              marginLeft: 30,
              marginBottom: 30,
              ...style,
          }}
          className={clsx(className ? className : null, styles.loadingProgress)}
      >
          <CircularProgress aria-describedby="loading" size={size} />
          {description && <div className={styles.description}>{description}</div>}
      </div>
  )
};

export default Loading;
