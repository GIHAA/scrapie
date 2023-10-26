import { ScrollView } from "react-native";
import RepairRequestOnGoingCard from "./RepairRequestOnGoingCard";

const onGoingRequests = [
    {
        imageSource: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Repair_Shop_title_card.jpg",
        name: "Kevin Repairsss",
        address: "Colombo 10",
        phoneNumber: "0768876564",
        budget: "19000",
        requestedAt: "2023-10-12",
        deliveryAt: "2023-10-19",
    },
    {
        imageSource: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Repair_Shop_title_card.jpg",
        name: "John's Electronics",
        address: "New York, NY",
        phoneNumber: "123-456-7890",
        budget: "15000",
        requestedAt: "2023-10-15",
        deliveryAt: "2023-10-22",
    },
    {
        imageSource: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Repair_Shop_title_card.jpg",
        name: "Tech Wizards",
        address: "Los Angeles, CA",
        phoneNumber: "555-555-5555",
        budget: "22000",
        requestedAt: "2023-10-10",
        deliveryAt: "2023-10-17",
    },
    {
        imageSource: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Repair_Shop_title_card.jpg",
        name: "Gadget Gurus",
        address: "Chicago, IL",
        phoneNumber: "777-777-7777",
        budget: "18000",
        requestedAt: "2023-10-18",
        deliveryAt: "2023-10-25",
    },
    {
        imageSource: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Repair_Shop_title_card.jpg",
        name: "Fix It All",
        address: "San Francisco, CA",
        phoneNumber: "888-888-8888",
        budget: "20000",
        requestedAt: "2023-10-14",
        deliveryAt: "2023-10-21",
    },
];

const RepairCenterOnGoingRequests = () => {
    return (
        <ScrollView>
            {onGoingRequests.map((request, index) => (
                <RepairRequestOnGoingCard
                    key={index}
                    imageSource={request.imageSource}
                    name={request.name}
                    address={request.address}
                    budget={request.budget}
                    requestedAt={request.requestedAt}
                    deliveryAt={request.deliveryAt}
                />
            ))}
        </ScrollView>
    );
}

export default RepairCenterOnGoingRequests;
