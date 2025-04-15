export const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+251 91 234 5678",
  addresses: [
    {
      id: "addr-001",
      name: "Home",
      street: "123 Main Street",
      city: "Addis Ababa",
      postalCode: "1000",
      country: "Ethiopia",
      isDefault: true,
    },
    {
      id: "addr-002",
      name: "Work",
      street: "456 Office Plaza",
      city: "Addis Ababa",
      postalCode: "1000",
      country: "Ethiopia",
      isDefault: false,
    },
  ],
  paymentMethods: [
    {
      id: "pm-001",
      type: "CARD",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
  ],
}
