loadAPI(14);

// Remove this if you want to be able to use deprecated methods without causing script to stop.
// This is useful during development.
host.setShouldFailOnDeprecatedUse(true);

host.defineController("Roland", "Go:Piano", "0.1", "30fd542b-a3a9-46d0-a957-ada5dec46ef1", "michael.petter@gmail.com");

host.defineMidiPorts(1, 1);

if (host.platformIsWindows())
{
   // TODO: Set the correct names of the ports for auto detection on Windows platform here
}
else if (host.platformIsMac())
{
   // TODO: Set the correct names of the ports for auto detection on Mac OSX platform here
}
else if (host.platformIsLinux())
{
   // TODO: Set the correct names of the ports for auto detection on Linux platform here
   // and uncomment this when port names are correct.
   host.addDeviceNameBasedDiscoveryPair(["Input Port 0"], ["Output Port 0"]);
}

function init() {
   transport = host.createTransport();
   host.getMidiInPort(0).setMidiCallback(onMidi0);
   host.getMidiInPort(0).setSysexCallback(onSysex0);

   noteIn = host.getMidiInPort(0).createNoteInput("Notes");
   noteIn.netShouldConsumeEvents(false);

   cursorTrack = host.createArrangerCursorTrack(2, 0);
	primaryDevice = cursorTrack. createCursorDevice("Primary");
   

   println("Go:Piano initialized!");
}

// Called when a short MIDI message is received on MIDI input port 0.
function onMidi0(status, data1, data2) {
   if (isProgramChange(status)){
      if (data1>=0 && data1<=26){
         cursorTrack.selectNext();
      }
   }
}

function flush() {
   // TODO: Flush any output to your controller here.
}

function exit() {

}