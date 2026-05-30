import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const STEPS = ['Summary', 'Payment', 'Address', 'Confirm'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {STEPS.map((label, idx) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                idx < current
                  ? 'bg-gray-900 text-white'
                  : idx === current
                  ? 'bg-gray-900 text-white ring-2 ring-gray-900 ring-offset-2'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {idx < current ? '✓' : idx + 1}
            </div>
            <span className={`text-[10px] font-semibold tracking-wide uppercase ${idx === current ? 'text-gray-900' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div className={`w-8 h-px mb-5 ${idx < current ? 'bg-gray-900' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function SummaryStep({ items, total }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-4">Order Summary</h3>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex items-center gap-3">
            <div className="w-12 h-14 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
              <p className="text-xs text-gray-500">Qty: {qty}</p>
            </div>
            <p className="text-sm font-bold text-gray-900">${(product.price * qty).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="font-bold text-lg text-gray-900">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

function PaymentStep({ user, selected, setSelected, newCard, setNewCard }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-4">Payment Method</h3>
      <div className="space-y-3">
        {user?.paymentMethods.map(pm => (
          <label key={pm.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
            <input
              type="radio"
              name="payment"
              value={`saved_${pm.id}`}
              checked={selected === `saved_${pm.id}`}
              onChange={() => setSelected(`saved_${pm.id}`)}
              className="accent-gray-900"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900 capitalize">
                {pm.type} •••• {pm.last4}
                {pm.isDefault && <span className="ml-2 text-xs text-gray-400">(default)</span>}
              </p>
              <p className="text-xs text-gray-500">Expires {pm.expiry}</p>
            </div>
          </label>
        ))}
        <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
          <input
            type="radio"
            name="payment"
            value="new"
            checked={selected === 'new'}
            onChange={() => setSelected('new')}
            className="accent-gray-900"
          />
          <span className="text-sm font-semibold text-gray-900">+ New card</span>
        </label>
      </div>

      {selected === 'new' && (
        <div className="mt-4 space-y-3">
          <input
            placeholder="Card number"
            maxLength={19}
            value={newCard.number}
            onChange={e => setNewCard(p => ({ ...p, number: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="MM/YY"
              maxLength={5}
              value={newCard.expiry}
              onChange={e => setNewCard(p => ({ ...p, expiry: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500"
            />
            <input
              placeholder="CVV"
              maxLength={4}
              value={newCard.cvv}
              onChange={e => setNewCard(p => ({ ...p, cvv: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500"
            />
          </div>
          <input
            placeholder="Cardholder name"
            value={newCard.name}
            onChange={e => setNewCard(p => ({ ...p, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500"
          />
        </div>
      )}
    </div>
  );
}

function AddressStep({ user, selected, setSelected, newAddr, setNewAddr }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-4">Shipping Address</h3>
      <div className="space-y-3">
        {user?.addresses.map(addr => (
          <label key={addr.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
            <input
              type="radio"
              name="address"
              value={`saved_${addr.id}`}
              checked={selected === `saved_${addr.id}`}
              onChange={() => setSelected(`saved_${addr.id}`)}
              className="mt-0.5 accent-gray-900"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {addr.label}
                {addr.isDefault && <span className="ml-2 text-xs text-gray-400">(default)</span>}
              </p>
              <p className="text-xs text-gray-500">{addr.street}, {addr.city} {addr.state} {addr.zip}</p>
            </div>
          </label>
        ))}
        <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
          <input
            type="radio"
            name="address"
            value="new"
            checked={selected === 'new'}
            onChange={() => setSelected('new')}
            className="accent-gray-900"
          />
          <span className="text-sm font-semibold text-gray-900">+ New address</span>
        </label>
      </div>

      {selected === 'new' && (
        <div className="mt-4 space-y-3">
          <input
            placeholder="Street address"
            value={newAddr.street}
            onChange={e => setNewAddr(p => ({ ...p, street: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500"
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              placeholder="City"
              value={newAddr.city}
              onChange={e => setNewAddr(p => ({ ...p, city: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500"
            />
            <input
              placeholder="State"
              value={newAddr.state}
              onChange={e => setNewAddr(p => ({ ...p, state: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500"
            />
            <input
              placeholder="ZIP"
              value={newAddr.zip}
              onChange={e => setNewAddr(p => ({ ...p, zip: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ConfirmStep({ items, total, paymentLabel, addressLabel }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-4">Confirm Order</h3>
      <div className="space-y-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">Items</p>
          <p className="text-sm text-gray-700">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          <p className="text-base font-bold text-gray-900 mt-1">${total.toFixed(2)}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">Payment</p>
          <p className="text-sm text-gray-700">{paymentLabel}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">Shipping to</p>
          <p className="text-sm text-gray-700">{addressLabel}</p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutModal({ onClose, onSuccess }) {
  const { items, total } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(0);

  const defaultPayment = user?.paymentMethods.find(p => p.isDefault);
  const defaultAddress = user?.addresses.find(a => a.isDefault);

  const [paymentSel, setPaymentSel] = useState(
    defaultPayment ? `saved_${defaultPayment.id}` : 'new'
  );
  const [newCard, setNewCard] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const [addrSel, setAddrSel] = useState(
    defaultAddress ? `saved_${defaultAddress.id}` : 'new'
  );
  const [newAddr, setNewAddr] = useState({ street: '', city: '', state: '', zip: '' });

  const getPaymentLabel = () => {
    if (paymentSel === 'new') return newCard.name ? `New card (${newCard.name})` : 'New card';
    const id = parseInt(paymentSel.replace('saved_', ''));
    const pm = user?.paymentMethods.find(p => p.id === id);
    return pm ? `${pm.type.charAt(0).toUpperCase() + pm.type.slice(1)} ••••${pm.last4}` : '';
  };

  const getAddressLabel = () => {
    if (addrSel === 'new') {
      return newAddr.street ? `${newAddr.street}, ${newAddr.city}` : 'New address';
    }
    const id = parseInt(addrSel.replace('saved_', ''));
    const addr = user?.addresses.find(a => a.id === id);
    return addr ? `${addr.street}, ${addr.city} ${addr.state} ${addr.zip}` : '';
  };

  const handlePlaceOrder = () => {
    onSuccess({
      paymentLabel: getPaymentLabel(),
      addressLabel: getAddressLabel(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl leading-none cursor-pointer border-none bg-transparent"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <StepIndicator current={step} />

          {step === 0 && <SummaryStep items={items} total={total} />}
          {step === 1 && (
            <PaymentStep
              user={user}
              selected={paymentSel}
              setSelected={setPaymentSel}
              newCard={newCard}
              setNewCard={setNewCard}
            />
          )}
          {step === 2 && (
            <AddressStep
              user={user}
              selected={addrSel}
              setSelected={setAddrSel}
              newAddr={newAddr}
              setNewAddr={setNewAddr}
            />
          )}
          {step === 3 && (
            <ConfirmStep
              items={items}
              total={total}
              paymentLabel={getPaymentLabel()}
              addressLabel={getAddressLabel()}
            />
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <button
            onClick={step === 0 ? onClose : () => setStep(s => s - 1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
          >
            {step === 0 ? 'Cancel' : 'Back'}
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="px-5 py-2 bg-gray-900 text-white rounded-md text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer border-none"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              className="px-5 py-2 bg-gray-900 text-white rounded-md text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer border-none"
            >
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
