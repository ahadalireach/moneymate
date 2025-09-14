import { useState } from "react";
import {
  BackButton,
  Header,
  Input,
  ModalWrapper,
  TransactionList,
} from "../../components";
import { colors, spacingY } from "../../constants/theme";
import { ScrollView, StyleSheet, View } from "react-native";
import { useAuth } from "../../contexts/authContext";
import { orderBy, where } from "firebase/firestore";
import { TransactionType } from "../../types";
import useFetchData from "../../hooks/useFetchData";

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
          style={{ marginBottom: spacingY._10 }}
        />
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Input
              placeholder="shoes..."
              value={search}
              placeholderTextColor={colors.neutral400}
              containerStyle={{ backgroundColor: colors.neutral800 }}
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
