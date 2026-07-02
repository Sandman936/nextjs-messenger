import type { IUserInfo } from "@/app/lib/types";
import ContactCard from "./contact-card/contact-card";

interface IProps {
  contacts_array: IUserInfo[];
}

const ContactList = ({ contacts_array }: IProps) => {
  return (
    <ul>
      {contacts_array.map((contact) => (
        <ContactCard card_data={contact} key={contact.id} />
      ))}
    </ul>
  );
};

export default ContactList;
