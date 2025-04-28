import { Image, Text, View, StyleSheet } from "react-native";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";

const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <View style={styles.card}>
      <View style={styles.innerContainer}>
        <View style={styles.topSection}>
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            style={styles.mapImage}
          />

          <View style={styles.addressContainer}>
            <View style={styles.addressRow}>
              <Image source={icons.to} style={styles.icon} />
              <Text style={styles.addressText} numberOfLines={1}>
                {ride.origin_address}
              </Text>
            </View>

            <View style={styles.addressRow}>
              <Image source={icons.point} style={styles.icon} />
              <Text style={styles.addressText} numberOfLines={1}>
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tarih & Saat</Text>
            <Text style={styles.detailValue} numberOfLines={1}>
              {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Sürücü</Text>
            <Text style={styles.detailValue}>
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Koltuk Sayısı</Text>
            <Text style={styles.detailValue}>
              {ride.driver.car_seats}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ödeme Durumu</Text>
            <Text
              style={[
                styles.paymentStatus,
                ride.payment_status === "paid" ? styles.paid : styles.unpaid,
              ]}
            >
              {ride.payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#d1d1d1",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 12,
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 12,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mapImage: {
    width: 80,
    height: 90,
    borderRadius: 8,
  },
  addressContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 16,
    gap: 16, // react-native desteklemiyor, istersen marginBottom ekleriz
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  addressText: {
    fontSize: 14,
    fontFamily: "JakartaMedium", // Eğer custom font yüklediysen
    flexShrink: 1,
  },
  detailsContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#f0f0f0", // bg-general-500 yerine
    borderRadius: 10,
    padding: 12,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "gray",
    fontFamily: "JakartaMedium",
  },
  detailValue: {
    fontSize: 14,
    fontFamily: "JakartaBold",
  },
  paymentStatus: {
    fontSize: 14,
    fontFamily: "JakartaBold",
    textTransform: "capitalize",
  },
  paid: {
    color: "green",
  },
  unpaid: {
    color: "red",
  },
});

export default RideCard;
