import {
  BackButton,
  Header,
  Input,
  ModalWrapper,
  TransactionList,
} from "../../components";
import { useState } from "react";
import { TransactionType } from "../../types";
import { orderBy, where } from "firebase/firestore";
import useFetchData from "../../hooks/useFetchData";
import { useAuth } from "../../contexts/authContext";
import { colors, spacingY } from "../../constants/theme";
import { ScrollView, StyleSheet, View } from "react-native";

const SearchModal = () => {
  const { user } = useAuth();

  const [search, setSearch] = useState("");

  const constraints = [where("uid", "==", user?.uid), orderBy("date", "desc")];

  const { data: allTransactions, isLoading: transactionsLoading } =
    useFetchData<TransactionType>("transactions", constraints);

  const filteredTransactions = allTransactions.filter((item) => {
    if (search.length > 1) {
      if (
        item.category?.toLowerCase().includes(search?.toLowerCase()) ||
        item.type?.toLowerCase().includes(search?.toLowerCase()) ||
        item.description?.toLowerCase().includes(search?.toLowerCase())
      ) {
        return true;
      }
      return false;
    }
    return true;
  });

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={"Search"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._5 }}
        />
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Search transactions"
              value={search}
              placeholderTextColor={colors.textLight}
              containerStyle={{ backgroundColor: colors.card }}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
          <View>
            <TransactionList
              isLoading={transactionsLoading}
              data={filteredTransactions}
              emptyListMessage="No transactions match your search keywords."
            />
          </View>
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },

  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },

  inputContainer: {
    gap: spacingY._10,
  },
});
