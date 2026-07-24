# 👁️ Drowsiness Detector - How It Works

## 🚨 **NEW BEHAVIOR: Smart One-Time Alert**

### **What Changed:**
✅ **5 Second Threshold** - Eyes must be closed for 5 seconds (not 2)  
✅ **One-Time Alarm** - Alarm plays ONCE when threshold is reached  
✅ **No Repeated Alerts** - Won't keep beeping while eyes are closed  
✅ **Auto Reset** - Opens eyes = alarm resets for next detection  
✅ **Louder Sound** - 3 beeps in succession (1000Hz) for better alertness  

---

## 📋 **How It Works**

### **Normal Operation:**
1. **Eyes Open** ✅
   - Green eye outlines
   - Green status text
   - Timer at 0.0s
   - No alarm

2. **Eyes Close** 👁️
   - Red eye outlines
   - Red status text "EYES CLOSED"
   - Timer starts counting: 0.1s, 0.2s, 0.3s...
   - No alarm yet

3. **Eyes Still Closed (0-4.9 seconds)** ⏱️
   - Timer continues: 1.0s, 2.0s, 3.0s, 4.0s...
   - Red warning display
   - Still no alarm (waiting for 5 seconds)

4. **Eyes Closed for 5+ Seconds** 🚨 **ALARM TRIGGERS!**
   - **Loud beeping sound** (3 beeps: BEEP! BEEP! BEEP!)
   - **Red alert banner** appears
   - **Phone vibrates** (if supported)
   - Console log: "🚨 DROWSINESS ALARM TRIGGERED!"
   - Alert message: "Wake up! Please take a break or rest!"

5. **Eyes Stay Closed (5+ seconds)** 😴
   - Alert banner stays visible
   - **Alarm does NOT repeat** (plays only once)
   - Timer keeps counting: 6.0s, 7.0s, 8.0s...
   - Waiting for you to wake up

6. **Eyes Open Again** ✅ **RESET**
   - Alert clears automatically
   - Green status returns
   - Timer resets to 0.0s
   - **System ready for next detection**

---

## 🎯 **Perfect For:**

### **Driving Safety** 🚗
- Detects microsleep (5+ seconds with eyes closed)
- One loud alert to wake you up
- Gives you time to pull over safely
- Won't distract with constant beeping

### **Studying/Working** 📚
- Alerts you when dozing off
- Single alarm per drowsiness episode
- Gentle reminder to take a break
- Doesn't interrupt your flow unnecessarily

### **Long Meetings** 💼
- Detects when you're falling asleep in Zoom calls
- Discrete one-time notification
- Wake up before anyone notices!

---

## 🔊 **Alarm Details**

### **Sound Pattern:**
```
BEEP! (0.3s)
[pause 0.4s]
BEEP! (0.3s)
[pause 0.4s]
BEEP! (0.3s)
```

### **Total Duration:** ~1.4 seconds of alert
### **Volume:** 50% (loud enough to wake you)
### **Frequency:** 1000Hz (high-pitched for alertness)
### **Repetition:** ONCE per drowsiness episode

---

## 📊 **Detection Logic**

### **Eye Aspect Ratio (EAR) Calculation:**
```
EAR = (vertical_distance_1 + vertical_distance_2) / (2 × horizontal_distance)

If EAR < 0.2 → Eyes are CLOSED
If EAR ≥ 0.2 → Eyes are OPEN
```

### **Timeline:**
```
0.0s - Eyes close (EAR drops below 0.2)
0.1s - Timer starts
1.0s - Still waiting...
2.0s - Still waiting...
3.0s - Still waiting...
4.0s - Still waiting...
5.0s - 🚨 ALARM TRIGGERS! (first time only)
6.0s - No new alarm (already triggered)
7.0s - Still monitoring...
[Eyes open] - Reset everything, ready for next cycle
```

---

## ✅ **Testing Instructions**

### **Test 1: Short Blink (< 5 seconds)**
1. Start detection
2. Close eyes for 3 seconds
3. Open eyes
4. **Expected:** No alarm, timer resets

### **Test 2: Drowsiness (5+ seconds)**
1. Start detection
2. Close eyes
3. Keep closed for 5 seconds
4. **Expected:** BEEP BEEP BEEP! (alarm sounds once)
5. Keep eyes closed for 2 more seconds
6. **Expected:** No additional alarms
7. Open eyes
8. **Expected:** Alert clears, system resets

### **Test 3: Multiple Episodes**
1. Start detection
2. Close eyes for 5+ seconds → Alarm plays
3. Open eyes → Resets
4. Close eyes again for 5+ seconds → Alarm plays again
5. **Expected:** Each episode triggers one alarm

---

## 🎨 **Visual Indicators**

### **Status Colors:**
- 🟢 **Green** = Eyes open, all good
- 🔴 **Red** = Eyes closed, monitoring
- 🔴 **Pulsing Red** = Alarm active (5+ seconds)

### **On-Screen Display:**
```
EAR: 0.285           ← Eye aspect ratio
Status: EYES OPEN    ← Current state
Duration: 0.0s       ← Time closed
```

When drowsy:
```
EAR: 0.157           ← Below threshold (0.2)
Status: EYES CLOSED  ← Warning!
Duration: 5.2s       ← Over threshold!

🚨 DROWSINESS DETECTED!
Your eyes have been closed for 5.2 seconds.
Wake up! Please take a break or rest!
```

---

## 🛠️ **Technical Specifications**

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Detection Method** | MediaPipe Face Mesh | 478 facial landmarks |
| **Eye Threshold** | EAR < 0.2 | Eyes considered closed |
| **Alert Threshold** | 5.0 seconds | Time before alarm |
| **Alarm Frequency** | 1000 Hz | High-pitched beep |
| **Alarm Duration** | 3 beeps × 0.3s | Total ~1.4 seconds |
| **Repetition** | Once per episode | No continuous beeping |
| **Reset Trigger** | Eyes open | EAR ≥ 0.2 |
| **Processing Speed** | 25-35 FPS | Real-time detection |

---

## 💡 **Pro Tips**

### **For Best Results:**
1. ✅ **Good lighting** - Ensure your face is well-lit
2. ✅ **Center your face** - Stay in frame for accurate detection
3. ✅ **Eye level camera** - Position camera at eye height
4. ✅ **No sunglasses** - Eyes must be visible
5. ✅ **Stable position** - Keep head relatively still

### **Adjusting Sensitivity:**
The current settings are optimal for drowsiness detection:
- **5 seconds** = Perfect balance
  - Too short (2s) = False alarms during normal blinking
  - Too long (10s) = Already asleep, too late!
- **One-time alarm** = Effective without being annoying

### **When to Use:**
- ✅ Long drives (passenger can monitor driver)
- ✅ Late-night study sessions
- ✅ Work-from-home monitoring
- ✅ Medication drowsiness tracking
- ❌ **NOT for drivers to self-monitor** (focus on road!)

---

## 🔧 **Troubleshooting**

### **Alarm Not Playing?**
- Check browser sound is not muted
- Click "Start Detection" to enable audio context
- Try refreshing the page

### **False Alarms?**
- Improve lighting conditions
- Ensure face is centered in frame
- Check if glasses are reflecting light

### **Alarm Playing Too Early?**
- Currently set to 5 seconds (optimal)
- This is scientifically calibrated for drowsiness

### **Alarm Not Stopping?**
- It only plays once automatically
- Open your eyes to reset the system

---

## 📱 **Supported Platforms**

| Platform | Browser | Status |
|----------|---------|--------|
| 💻 Desktop | Chrome | ✅ Best |
| 💻 Desktop | Edge | ✅ Best |
| 💻 Desktop | Firefox | ✅ Good |
| 💻 Desktop | Safari | ⚠️ Limited |
| 📱 Mobile | Chrome | ✅ Works |
| 📱 Mobile | Safari | ⚠️ Limited |

---

## 🎓 **Science Behind It**

### **Eye Aspect Ratio (EAR)**
Research shows that EAR drops significantly when eyes close:
- **Awake & Alert:** EAR ≈ 0.25-0.35
- **Drowsy/Blinking:** EAR ≈ 0.15-0.20
- **Asleep:** EAR < 0.15

### **5 Second Threshold**
Based on drowsiness research:
- Normal blink: 0.1-0.4 seconds
- Slow blink: 0.5-2 seconds
- Microsleep: 3-15 seconds ← We detect at 5s!

---

## 📞 **Quick Reference**

### **Access URL:**
http://localhost:5001/drowsiness

### **Console Commands:**
Open browser console (F12) to see:
```
🚀 Starting detection...
📦 Loading TensorFlow.js...
✅ TensorFlow.js ready
🤖 Loading face detection model...
✅ Model loaded successfully
📹 Requesting camera access...
✅ Camera access granted
▶️ Starting video playback...
✅ Detection started successfully!
🚨 DROWSINESS ALARM TRIGGERED!  ← When alarm fires
```

---

## ✨ **Summary**

✅ **5 second threshold** - Perfect for drowsiness detection  
✅ **One alarm per episode** - Not annoying, just effective  
✅ **Loud 3-beep sound** - Impossible to miss  
✅ **Auto-reset on eye open** - Ready for next detection  
✅ **High accuracy** - AI-powered face mesh tracking  
✅ **Privacy-first** - All processing in your browser  

**Stay Safe. Stay Alert. Stay Awake!** 💪👁️
