
echo "Waiting for 20s..."
sleep 20s
echo "Done waiting!"
echo "ls"
ls
cd user-container-dir
pwd
echo "ls (within user-container-dir)"
ls
#cargo run --release
#echo "DOCKER SAY HEY"