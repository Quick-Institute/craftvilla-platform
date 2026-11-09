"use client";

import React, { useState } from "react";
import { useOrderStore } from "@/lib/store/orderStore";
import { useToastStore } from "@/lib/store/toastStore";
import { KANBAN_COLUMNS } from "@/lib/data";
import { Order } from "@/lib/types";
import { formatLKR } from "@/lib/utils";
import { Download, UploadCloud, Printer, CheckCircle2, X, ArrowRight } from "lucide-react";

interface KanbanBoardProps {
  artisanFilter?: string;
}

export default function KanbanBoard({ artisanFilter }: KanbanBoardProps) {
  const { orders, advanceOrder } = useOrderStore();
  const { showToast } = useToastStore();

  const [activeManifestOrder, setActiveManifestOrder] = useState<Order | null>(null);
  const [activeProofOrder, setActiveProofOrder] = useState<Order | null>(null);
  const [proofPhotoUploaded, setProofPhotoUploaded] = useState(false);

  const handleAdvance = (orderId: number) => {
    const res = advanceOrder(orderId);
    if (res.success) {
      if (res.dispatched) {
        showToast("Handed to courier. Milestone tracking updated!");
      } else {
        showToast("Ticket advanced to next pipeline stage.");
      }
    }
  };

  const handleDownloadSpecs = (order: Order) => {
    const item = order.items[0];
    const specContent = `CRAFTVILLA ARTISANAL SPECIFICATION SHEET
=============================================
Order Reference: #${order.code}
Customer: ${order.customerName}
Delivery To: ${order.deliveryAddress}
Created Date: ${order.createdAt}
---------------------------------------------
Item: ${item?.name}
Custom Inscription: "${item?.text || 'N/A'}"
Font: ${item?.font || 'Artisanal'}
Finish / Stain: ${item?.finish}
Dimensions: Standard 30 x 20 cm
Reference Image: ${item?.imageUrl ? 'Attached (Base64)' : 'None'}
=============================================
Crafting Instructions: Season timber, laser inscribe approved text, oil finish.`;

    const blob = new Blob([specContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SpecSheet_${order.code}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded Spec Sheet for #${order.code}`);
  };

  const handleUploadProofSuccess = () => {
    if (activeProofOrder) {
      handleAdvance(activeProofOrder.id);
      setActiveProofOrder(null);
      setProofPhotoUploaded(false);
      showToast(`Proof photo submitted for #${activeProofOrder.code}! Moved to Ready to Dispatch.`);
    }
  };

  // Filter orders by artisan if specified, otherwise show all
  const filteredOrders = artisanFilter
    ? orders.filter((o) =>
        o.items.some((item) => item.name.toLowerCase().includes(artisanFilter.toLowerCase()))
      )
    : orders;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" role="region" aria-label="Artisan production pipeline board">
        {KANBAN_COLUMNS.map((colName, colIndex) => {
          const columnOrders = filteredOrders.filter((o) => o.col === colIndex);

          return (
            <div key={colName} className="bg-[#f4ede2] border border-[#e2d5c4] rounded-[24px] p-4 flex flex-col justify-between min-h-[420px]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#e2d5c4] mb-3">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#3a2418]">
                    {colName}
                  </h3>
                  <span className="bg-[#fbf7f0] text-[#8a3a1f] px-2.5 py-0.5 rounded-full text-xs font-bold border border-[#e2d5c4]">
                    {columnOrders.length}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {columnOrders.length > 0 ? (
                    columnOrders.map((order) => {
                      const firstItem = order.items[0];
                      return (
                        <div key={order.id} className="p-4 space-y-2.5 rounded-[20px] shadow-xs border border-[#e2d5c4] bg-[#fbf7f0] transition-all hover:shadow-sm">
                          <div className="flex items-center justify-between">
                            <b className="text-xs font-mono text-[#8a3a1f]">#{order.code}</b>
                            <span className="text-[10px] text-[#7b6a5d] bg-[#f4ede2] px-2.5 py-0.5 rounded-full font-semibold border border-[#e2d5c4]">
                              ⚡ {Math.max(5 - colIndex, 1)}d Left
                            </span>
                          </div>

                          <div>
                            <span className="text-xs font-bold text-[#3a2418] block leading-snug">
                              {order.name}
                            </span>
                            {firstItem && (
                              <div className="text-[11px] text-[#7b6a5d] bg-[#f4ede2]/70 p-2.5 rounded-[14px] mt-2 border border-[#e2d5c4]/60 space-y-1">
                                <p className="leading-snug">
                                  Inscription: &ldquo;<b className="text-[#3a2418]">{firstItem.text}</b>&rdquo;
                                </p>
                                <p className="text-[10px] text-[#7b6a5d]">
                                  Finish: {firstItem.finish} · {firstItem.font || "Custom"}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Column 1: New Orders -> Accept & Lock */}
                          {colIndex === 0 && (
                            <button
                              type="button"
                              onClick={() => handleAdvance(order.id)}
                              className="w-full bg-[#b4532f] hover:bg-[#9e4732] text-white text-xs py-2 px-3 rounded-full font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer mt-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accept &amp; Lock Ticket</span>
                            </button>
                          )}

                          {/* Column 2: In Crafting -> Download Specs & Move to Quality Check */}
                          {colIndex === 1 && (
                            <div className="space-y-2 pt-1">
                              <button
                                type="button"
                                onClick={() => handleDownloadSpecs(order)}
                                className="w-full bg-white hover:bg-[#f4ede2] border border-[#e2d5c4] text-[#3a2418] text-[11px] font-semibold py-1.5 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                              >
                                <Download className="w-3 h-3 text-[#b4532f]" />
                                <span>Download Customer Specs</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAdvance(order.id)}
                                className="w-full bg-[#3a2418] hover:bg-[#b4532f] text-[#f4ede2] text-xs py-2 px-3 rounded-full font-bold transition-all shadow-xs cursor-pointer"
                              >
                                <span>Move to Quality Check</span>
                              </button>
                            </div>
                          )}

                          {/* Column 3: Quality Check -> Upload Finished Proof Photo */}
                          {colIndex === 2 && (
                            <div className="space-y-1.5 pt-1">
                              <button
                                type="button"
                                onClick={() => setActiveProofOrder(order)}
                                className="w-full bg-[#b4532f] hover:bg-[#9e4732] text-white text-[11px] py-2 px-3 rounded-full font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                              >
                                <UploadCloud className="w-3.5 h-3.5" />
                                <span>Upload Inspection Proof</span>
                              </button>
                            </div>
                          )}

                          {/* Column 4: Ready to Dispatch -> Print Manifest & Mark Dispatched */}
                          {colIndex === 3 && (
                            <div className="space-y-2 pt-1">
                              <button
                                type="button"
                                onClick={() => setActiveManifestOrder(order)}
                                className="w-full bg-white hover:bg-[#f4ede2] border border-[#e2d5c4] text-[#3a2418] text-[11px] font-semibold py-1.5 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                              >
                                <Printer className="w-3.5 h-3.5 text-[#b4532f]" />
                                <span>Print Shipping Manifest</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAdvance(order.id)}
                                className="w-full bg-[#5f6b35] hover:bg-[#4f592c] text-white text-xs py-2 px-3 rounded-full font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Hand to Courier</span>
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-6 text-center text-xs text-[#7b6a5d] border border-dashed border-[#e2d5c4] rounded-[20px]">
                      No tickets currently in this stage.
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Proof Photo Upload Modal */}
      {activeProofOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#fbf7f0] max-w-md w-full p-6 sm:p-8 rounded-[30px] border border-[#e2d5c4] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2d5c4]">
              <h3
                className="text-xl font-semibold text-[#3a2418]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Quality Inspection Proof #{activeProofOrder.code}
              </h3>
              <button
                type="button"
                onClick={() => setActiveProofOrder(null)}
                className="w-8 h-8 rounded-full bg-[#f4ede2] text-[#7b6a5d] hover:text-[#3a2418] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#7b6a5d]">
              Take a high-resolution photo of the finished craft showing the engraved inscription clearly.
            </p>

            <div
              onClick={() => setProofPhotoUploaded(true)}
              className="border-2 border-dashed border-[#e2d5c4] p-8 rounded-[22px] text-center cursor-pointer hover:border-[#b4532f] bg-white/60 transition-colors"
            >
              <UploadCloud className="w-8 h-8 text-[#b4532f] mx-auto mb-2" />
              <p className="text-xs font-bold text-[#3a2418]">
                {proofPhotoUploaded ? "✓ Finished craft photograph attached!" : "Click to take photo or upload finished piece inspection"}
              </p>
              <p className="text-[11px] text-[#7b6a5d] mt-1">Proof will be displayed to customer</p>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setActiveProofOrder(null)}
                className="flex-1 bg-transparent hover:bg-white/60 border border-[#e2d5c4] text-[#3a2418] text-xs font-bold py-2.5 rounded-full cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!proofPhotoUploaded}
                onClick={handleUploadProofSuccess}
                className="flex-1 bg-[#b4532f] hover:bg-[#9e4732] disabled:opacity-50 text-white text-xs font-bold py-2.5 rounded-full shadow-md cursor-pointer"
              >
                Confirm &amp; Ready Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Manifest Modal */}
      {activeManifestOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#fbf7f0] max-w-lg w-full p-6 sm:p-8 rounded-[30px] border border-[#e2d5c4] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2d5c4]">
              <h3
                className="text-xl font-semibold text-[#3a2418]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Island Courier Dispatch Manifest
              </h3>
              <button
                type="button"
                onClick={() => setActiveManifestOrder(null)}
                className="w-8 h-8 rounded-full bg-[#f4ede2] text-[#7b6a5d] hover:text-[#3a2418] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white p-4 rounded-[20px] border border-[#e2d5c4] font-mono text-xs space-y-2 text-[#3a2418]">
              <div className="flex justify-between border-b pb-2">
                <b>CRAFTVILLA COURIER MANIFEST</b>
                <span>#{activeManifestOrder.code}</span>
              </div>
              <p><b>Recipient:</b> {activeManifestOrder.customerName}</p>
              <p><b>Address:</b> {activeManifestOrder.deliveryAddress}</p>
              <p><b>Craft Item:</b> {activeManifestOrder.items[0]?.name}</p>
              <p><b>Packaging:</b> Fragile Ceylon Teak / Keepsake Box (Eco-wrapped)</p>
              <p><b>Payment Status:</b> PRE-PAID IN FULL ({activeManifestOrder.paymentMethod})</p>
            </div>

            <button
              type="button"
              onClick={() => {
                window.print();
                setActiveManifestOrder(null);
                showToast("Manifest printed. Courier barcode ready.");
              }}
              className="w-full bg-[#b4532f] hover:bg-[#9e4732] text-white font-bold text-xs py-3 px-6 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Waybill Slip</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
