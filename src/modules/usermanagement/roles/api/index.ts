export const getUserRoleName = (value: string) => {
  switch (value) {
    case "Admin":
      return "Admin";
    case "production":
      return "Produktionsleitung";
    case "management":
      return "Geschäftsleitung";
    case "office":
      return "Büro";
    case "accounting":
      return "Buchhaltung";
    case "qualitymanagement":
      return "QMB";
    case "logistics":
      return "Logistik";
    default:
      throw new Error("Could not find userRole " + value);
  }
};
