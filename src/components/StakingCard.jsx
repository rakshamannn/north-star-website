import { useState } from 'react'
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { CaretRight } from '@phosphor-icons/react'
import './StakingCard.css'

const STAKING_BY_CHAIN = {
  sol: {
    balanceLabel: '320 SOL',
    stakedPct: 80,
    rewardRateLabel: '6.50%',
    totalRewardsLabel: '0 SOL',
  },
  eth: {
    balanceLabel: '12.5 ETH',
    stakedPct: 45,
    rewardRateLabel: '4.20%',
    totalRewardsLabel: '0.05 ETH',
  },
}

function SegmentedControl({ value, onValueChange, options }) {
  const reduceMotion = useReducedMotion()
  return (
    <LayoutGroup id="staking-segmented-control">
      <div className="staking-toggle" role="tablist" aria-label="Staking network">
        {options.map((opt) => {
          const active = opt.id === value
          return (
            <button
              key={opt.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onValueChange(opt.id)}
              className={`staking-toggle-btn${active ? ' active' : ''}`}
            >
              {active && (
                <motion.span
                  layoutId="staking-thumb"
                  aria-hidden
                  className="staking-toggle-thumb"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 520, damping: 42, mass: 0.9 }
                  }
                />
              )}
              <span className="staking-toggle-label">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}

export default function StakingCard() {
  const [chain, setChain] = useState('sol')
  const staking = STAKING_BY_CHAIN[chain]

  return (
    <div className="staking-card">
      {/* Heading */}
      <button type="button" className="staking-heading-btn group">
        <span className="staking-heading-text">
          Staking
          <CaretRight size={12} className="staking-heading-caret" aria-hidden />
        </span>
      </button>

      {/* Toggle */}
      <div className="staking-toggle-wrap">
        <SegmentedControl
          value={chain}
          onValueChange={setChain}
          options={[
            { id: 'sol', label: 'Solana' },
            { id: 'eth', label: 'Ethereum' },
          ]}
        />
      </div>

      {/* Balance */}
      <p className="staking-balance">{staking.balanceLabel}</p>

      {/* Progress bar */}
      <div className="staking-progress-track">
        <div
          className="staking-progress-fill"
          style={{ width: `${staking.stakedPct}%` }}
        />
      </div>
      <p className="staking-pct-label">{staking.stakedPct}% staked</p>

      {/* Metadata rows */}
      <div className="staking-meta-rows">
        <div className="staking-meta-row">
          <span className="staking-meta-key">Estimated reward rate</span>
          <span className="staking-meta-val teal">{staking.rewardRateLabel}</span>
        </div>
        <div className="staking-meta-row">
          <span className="staking-meta-key">Total rewards</span>
          <span className="staking-meta-val">{staking.totalRewardsLabel}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="staking-btns">
        <button type="button" className="staking-btn-unstake">Unstake</button>
        <button type="button" className="staking-btn-stake">Stake</button>
      </div>
    </div>
  )
}
