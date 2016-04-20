import React from 'react';
import { ThreeOscSynth } from 'wavedef';
import AudioControlGroup from '../components/AudioControlGroup.js';
import Slider from '../components/Slider.js';
import Switch from '../components/Switch.js';
import WaveSelector from '../components/WaveSelector.js';
import Keyboard from '../components/Keyboard.js';

export default class ThreeOscSynthUI extends React.Component
{
  componentWillMount()
  {
    this.threeOscSynth = new ThreeOscSynth();
  }

  render()
  {
    let { oscGroup, mixer, filter, envelope } = this.threeOscSynth;
    let { osc1, osc2, osc3 } = oscGroup;

    return (
      <div className='three-osc-synth'>
        <AudioControlGroup label='Osc 1'>
          <Switch
            onToggleOn={() => mixer.ch1.toggleOn()} onToggleOff={() => mixer.ch1.toggleOff()} state={true} className='osc-power-switch' />
          <WaveSelector name='osc1-waveform' label='Wave' defaultValue='sawtooth' onChange={osc1::osc1.setWaveformType} />
          <Slider label='Volume'
            min='0' max='1' step='0.01' defaultValue='1' onInput={(val) => mixer.ch1.setGain(val)} />
        </AudioControlGroup>

        <AudioControlGroup label='Osc 2'>
          <Switch
            onToggleOn={() => mixer.ch2.toggleOn()} onToggleOff={() => mixer.ch2.toggleOff()} state={true} className='osc-power-switch' />
          <WaveSelector name='osc2-waveform' label='Wave' defaultValue='triangle' onChange={osc2::osc2.setWaveformType} />
          <Slider label='Volume'
            min='0' max='1' step='0.01' defaultValue='1' onInput={(val) => mixer.ch2.setGain(val)} />
          <Slider label='Frequency Offset'
            min='-1200' max='1200' step='10' defaultValue='400' onInput={osc2::osc2.setDetune} />
        </AudioControlGroup>

        <AudioControlGroup label='Osc 3'>
          <Switch
            onToggleOn={() => mixer.ch3.toggleOn()} onToggleOff={() => mixer.ch3.toggleOff()} state={true} className='osc-power-switch' />
          <WaveSelector name='osc3-waveform' label='Wave' defaultValue='square' onChange={osc3::osc3.setWaveformType} />
          <Slider label='Volume'
            min='0' max='1' step='0.01' defaultValue='1' onInput={(val) => mixer.ch3.setGain(val)} />
          <Slider label='Frequency Offset'
            min='-1200' max='1200' step='10' defaultValue='700' onInput={osc3::osc3.setDetune} />
        </AudioControlGroup>

        <div className='audio-control-column'>
          <AudioControlGroup label='Filter'>
            <Slider label='Cutoff Frequency'
              min='50' max='1200' step='5' defaultValue='1200' onInput={filter::filter.setFrequency} />
            <Slider label='Resonance'
              min='1' max = '14' step='0.01' defaultValue='1' onInput={filter::filter.setQ} />
          </AudioControlGroup>

          <AudioControlGroup label='LFO'>
          <WaveSelector name='lfo-waveform' label='Wave' defaultValue='sine' onChange={lfo::lfo.setWaveformType} />
            <Slider label='Depth'
              min={0} max={100} step={0.5} defaultValue={1} onInput={lfo::lfo.setDepth} />
            <Slider label='Speed'
                min={0} max={20} step={0.001} defaultValue={1} onInput={lfo::lfo.setFrequency} />
          </AudioControlGroup>
        </div>

        <div className='audio-control-column'>
          <AudioControlGroup label='Volume Envelope' className='envelope'>
            <Slider label='A' vertical={true}
              min={0} max={2.25} step={0.1} defaultValue={0.2} onInput={envelope::envelope.setAttack} />
            <Slider label='D' vertical={true}
              min={0} max={4.5} step={0.1} defaultValue={0.1} onInput={envelope::envelope.setDecay} />
            <Slider label='S' vertical={true}
              min={0} max={1} step={0.1} defaultValue={1} onInput={envelope::envelope.setSustain} />
            <Slider label='R' vertical={true}
              min={0} max={3} step={0.1} defaultValue={0.5} onInput={envelope::envelope.setRelease} />
          </AudioControlGroup>

          <AudioControlGroup label='Chorus'>
            <Slider label='Offset 1'
              min={0.001} max={0.1} step={0.001} defaultValue={0.006} onInput={chorus::chorus.setOffset1} />
            <Slider label='Offset 2'
              min={0.001} max={0.1} step={0.001} defaultValue={0.020} onInput={chorus::chorus.setOffset2} />
            <Slider label='Width'
              min={0} max={1} step={0.001} defaultValue={0.25} onInput={chorus::chorus.setWidth} />
            <Slider label='Mix'
              min={0} max={1} step={0.001} defaultValue={0} onInput={chorus::chorus.setWetDryMix} />
            <Slider label='Movement'
              min={0} max={0.05} step={0.0001} defaultValue={0.005} onInput={chorus::chorus.setMovement} />
          </AudioControlGroup>
        </div>

        <div className='audio-control-column'>
          <AudioControlGroup label='Delay'>
            <Slider label='Time'
              min={0.001} max={6.4} step={0.01} defaultValue={0.5} onInput={delay::delay.setDelayTime} />
            <Slider label='Feedback'
              min={0} max={1} step={0.01} defaultValue={0.8} onInput={delay::delay.setFeedback} />
            <Slider label='Mix'
              min={0} max={1} step={0.01} defaultValue={0} onInput={delay::delay.setWetDryMix} />
          </AudioControlGroup>
        </div>

        <AudioControlGroup label='EQ'>
          <Slider label='Low Frequency'
            min={50} max={5000} step={1} defaultValue={250} onInput={eq3::eq3.lowFrequency} />
          <Slider label='Low Gain'
            min={-50} max={25} step={0.01} defaultValue={0} onInput={eq3::eq3.lowSetGain} />
          <Slider label='Mid Gain'
            min={-50} max={25} step={0.01} defaultValue={0} onInput={eq3::eq3.midSetGain} />
          <Slider label='High Frequency'
            min={200} max={18000} step={1} defaultValue={2500} onInput={eq3::eq3.highFrequency} />
          <Slider label='High Gain'
            min={-50} max={25} step={0.01} defaultValue={0} onInput={eq3::eq3.highSetGain} />
        </AudioControlGroup>

        <AudioControlGroup label='Ringmod'>
          <WaveSelector name='ringmod-waveform' label='Wave' defaultValue='sine' onChange={ringmod::ringmod.setWaveformType} />
          <Slider label='Frequency'
            min={2} max={1000} step={1} defaultValue={100} onInput={ringmod::ringmod.setFrequency} />
          <Slider label='Depth'
            min={0} max={1} step={0.01} defaultValue={1} onInput={ringmod::ringmod.setDepth} />
          <Slider label='Mix'
            min={0} max={1} step={0.01} defaultValue={0} onInput={ringmod::ringmod.setWetDryMix} />
          <WaveSelector name='ringmod-lfo-waveform' label='LFO Wave' defaultValue='sine' onChange={ringmod::ringmod.setLfoWaveformType} />
          <Slider label='LFO Rate'
            min={0.1} max={25} step={0.001} defaultValue={0.1} onInput={ringmod::ringmod.lfoRate} />
          <Slider label='LFO Depth'
            min={0} max={1000} step={1} defaultValue={0} onInput={ringmod::ringmod.lfoDepth} />
        </AudioControlGroup>

        <Keyboard octaves={7} startingOctave={1}
          onKeypress={[
            osc1::osc1.setFrequency,
            osc2::osc2.setFrequency,
            osc3::osc3.setFrequency,
            envelope::envelope.triggerADS,
          ]}
          onKeyRelease={[
            envelope::envelope.triggerRelease
          ]}
        />
      </div>
    )
  }
}
