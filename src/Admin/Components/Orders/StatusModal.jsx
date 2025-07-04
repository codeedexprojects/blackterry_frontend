import React, { useState } from "react";
import { updateOrderStatus } from "../../serveices/adminApi";

export const UpdateStatusModal = ({
    order,
    onClose,
    onStatusUpdate
}) => {
    const [selectedStatus, setSelectedStatus] = useState(order?.status || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleStatusUpdate = async () => {
        if (!selectedStatus || selectedStatus === order.status) {
            onClose();
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Call the API to update status
            const response = await updateOrderStatus(
                { status: selectedStatus },
                order._id
            );

            // Notify parent component about the successful update
            onStatusUpdate(order._id, selectedStatus);
            onClose();
        } catch (err) {
            console.error("Failed to update status:", err);
            setError(err.message || "Failed to update order status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Update Order Status
                </h2>

                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                        Current Status: <span className="font-medium capitalize">{order?.status}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        Order ID: <span className="font-medium">{order?.orderId}</span>
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Status
                    </label>
                    <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="In-Transist">In-Transist</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Returned">Returned</option>
                        <option value="ReturnRequested">ReturnRequested</option>
                        <option value="ReturnApproved">ReturnApproved</option>
                        <option value="ReturnRejected">ReturnRejected</option>

                    </select>
                </div>

                {error && (
                    <div className="text-red-500 text-sm mb-4">{error}</div>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors"
                        onClick={handleStatusUpdate}
                        disabled={loading || !selectedStatus || selectedStatus === order?.status}
                    >
                        {loading ? "Updating..." : "Update Status"}
                    </button>
                </div>
            </div>
        </div>
    );
};