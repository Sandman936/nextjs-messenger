"use client";

import { useEffect, useState } from "react";
import ChatCardSkeleton from "@/app/components/chat-list/chat-card/chat-card-skeleton";
import ContactCard from "@/app/components/contact-list/contact-card/contact-card";
// import ContactList from "@/app/components/contact-list/contact-list";
import SearchBar from "@/app/components/ui/search-bar/search-bar";
import { searchUsersByQuery } from "@/app/lib/actions/contacts";
import { useDebounce } from "@/app/lib/hooks/use-debounce";
import type { IUserInfo } from "@/app/lib/types";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<IUserInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [foundUsers, setFoundUsers] = useState<IUserInfo[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");

  const debounceSearchQuery = useDebounce(searchQuery);

  useEffect(() => {
    const performSearch = async () => {
      if (debounceSearchQuery.length < 2) {
        setFoundUsers([]);
        setSearchError("");
        return;
      }

      setIsSearching(true);
      setSearchError("");

      try {
        const users = await searchUsersByQuery(debounceSearchQuery);
        setFoundUsers(users);
      } catch (error) {
        console.error("Search error:", error);
        setSearchError("Ошибка при поиске пользователей");
        setFoundUsers([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debounceSearchQuery]);

  return (
    <div className="bg-(--primary-purple) border-r-2 border-(--primary-purple) flex flex-col gap-6 h-full">
      <SearchBar
        placeholder="Поиск контактов"
        onChangeHandler={setSearchQuery}
      />
      {isSearching ? (
        <ChatCardSkeleton />
      ) : searchError ? (
        <div className="text-center text-lg text-red-400">{searchError}</div>
      ) : foundUsers.length > 0 ? (
        <div className="flex flex-col gap-3">
          <div className="border-l-6 border-(--accent-light-color) bg-(--text-secondary-color) text-(--text-primary-color) text-lg pl-3">
            Найденные пользователи:
          </div>
          {foundUsers.map((contact) => (
            <ContactCard card_data={contact} key={contact.id} />
          ))}
        </div>
      ) : (
        !isSearching &&
        searchQuery &&
        foundUsers.length === 0 &&
        !searchError && (
          <div className="border-l-6 border-red-400 bg-(--text-secondary-color) text-(--text-primary-color) text-lg pl-3">
            Пользователи не найдены
          </div>
        )
      )}
      {/*!hasSearchQuery && <ContactList contacts_array={contacts} /> */}
    </div>
  );
}
