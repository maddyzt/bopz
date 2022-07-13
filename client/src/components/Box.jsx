const Box = ({
  alignItems,
  children,
  backgroundColor,
  border,
  borderRadius,
  color,
  display,
  overflow,
  fontFamily = "Helvetica",
  fontSize = "1rem",
  fontWeight = 300,
  minHeight,
  margin,
  padding,
  width,
  textAlign,
  style,
  ...props
}) => {
  return (
    <div
      {...props}
      style={{
        border,
        backgroundColor,
        borderRadius,
        color,
        fontFamily,
        fontSize,
        fontWeight,
        overflow,
        minHeight,
        margin,
        padding,
        width,
        textAlign,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Box;
