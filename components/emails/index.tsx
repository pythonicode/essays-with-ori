export const NewCustomer = ({ customer, main, supplementals }: any) => ({
  subject: `👋 New Customer! ${customer.firstname}`,
  body: (
    <div>
      <p>Hope you'll enjoy the package!</p>
    </div>
  ),
});
