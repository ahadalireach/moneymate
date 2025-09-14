import {
  Header,
  Loading,
  ScreenWrapper,
  TransactionList,
} from "../../components";
import {
  fetchMonthlyStats,
  fetchWeeklyStats,
  fetchYearlyStats,
} from "../../services/transactionService";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { BarChart } from "react-native-gifted-charts";
import { scale, verticalScale } from "../../utils/styling";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { colors, radius, spacingX, spacingY } from "../../constants/theme";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

const Statistics = () => {
  const { user } = useAuth();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [transactionData, setTransactionData] = useState<any[]>([]);

  useEffect(() => {
    if (activeIndex === 0) {
      getWeeklyStats();
    }
    if (activeIndex === 1) {
      getMonthlyStats();
    }
    if (activeIndex === 2) {
      getYearlyStats();
    }
  }, [activeIndex]);

  const getWeeklyStats = async () => {
    setIsLoading(true);
    try {
      let res = await fetchWeeklyStats(user?.uid as string);
      if (res.success) {
        setChartData(res?.data?.stats);
        setTransactionData(res?.data?.transactions);
      } else {
        Alert.alert("Error", res.msg || "Failed to fetch weekly statistics");
      }
    } catch (error: any) {
      console.error("Weekly stats error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getMonthlyStats = async () => {
    setIsLoading(true);
    try {
      let res = await fetchMonthlyStats(user?.uid as string);
      if (res.success) {
        setChartData(res?.data?.stats);
        setTransactionData(res?.data?.transactions);
      } else {
        Alert.alert("Error", res.msg || "Failed to fetch monthly statistics");
      }
    } catch (error: any) {
      console.error("Monthly stats error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getYearlyStats = async () => {
    setIsLoading(true);
    try {
      let res = await fetchYearlyStats(user?.uid as string);
      if (res.success) {
        setChartData(res?.data?.stats);
        setTransactionData(res?.data?.transactions);
      } else {
        Alert.alert("Error", res.msg || "Failed to fetch yearly statistics");
      }
    } catch (error: any) {
      console.error("Yearly stats error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header title="Statistics" />
        </View>

        <ScrollView
          contentContainerStyle={{
            gap: spacingY._20,
            paddingTop: spacingY._5,
            paddingBottom: verticalScale(100),
          }}
          showsVerticalScrollIndicator={false}
        >
          <SegmentedControl
            values={["Weekly", "Monthly", "Yearly"]}
            selectedIndex={activeIndex}
            onChange={(event) => {
              setActiveIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            tintColor={colors.neutral200}
            backgroundColor={colors.neutral800}
            appearance="dark"
            activeFontStyle={styles.segmentFontStyle}
            style={styles.segmentStyle}
            fontStyle={{ ...styles.segmentFontStyle, color: colors.white }}
          />

          <View style={styles.chartContainer}>
            {chartData.length > 0 ? (
              <BarChart
                data={chartData}
                barWidth={scale(12)}
                spacing={[1, 2].includes(activeIndex) ? scale(25) : scale(16)}
                roundedTop
                roundedBottom
                hideRules
                yAxisLabelPrefix="$"
                yAxisThickness={1}
                xAxisThickness={0}
                yAxisLabelWidth={
                  [1, 2].includes(activeIndex) ? scale(38) : scale(35)
                }
                hideYAxisText={false}
                yAxisTextStyle={{
                  color: colors.neutral350,
                  fontSize: verticalScale(11),
                }}
                xAxisLabelTextStyle={{
                  color: colors.neutral350,
                  fontSize: verticalScale(12),
                }}
                noOfSections={3}
                minHeight={5}
                isAnimated={true}
                animationDuration={1000}
                barBorderRadius={4}
                showGradient={false}
                barStyle={{
                  borderRadius: 4,
                }}
              />
            ) : (
              <View style={styles.noChart}></View>
            )}
            {isLoading && (
              <View style={styles.chartLoadingContainer}>
                <Loading />
              </View>
            )}
          </View>
          <View>
            <TransactionList
              data={transactionData}
              title="Transactions"
              emptyListMessage="No transactions found for this period."
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  chartContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  chartLoadingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: radius._12,
    backgroundColor: "[rgba(0,0,0, 0.6)",
  },
  header: {},
  noChart: {
    backgroundColor: "[rgba(0,0,0, 0.6)",
    height: verticalScale(210),
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: verticalScale(35),
    width: verticalScale(35),
    borderCurve: "continuous",
  },
  segmentStyle: {
    height: scale(37),
  },
  segmentFontStyle: {
    fontSize: verticalScale(13),
    fontWeight: "bold",
    color: colors.black,
  },
  container: {
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._5,
    gap: spacingY._10,
  },
});
