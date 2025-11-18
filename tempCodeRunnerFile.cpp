#include <iostream>
using namespace std;

int main() {
    int pilihan;

    cout << "Masukkan nombor (1-3): ";
    cin >> pilihan;

    switch (pilihan) {
        case 1:
            cout << "Anda pilih nombor 1";
            break;

        case 2:
            cout << "Anda pilih nombor 2";
            break;

        case 3:
            cout << "Anda pilih nombor 3";
            break;

        default:
            cout << "Pilihan tidak sah!";
    }

    return 0;
}
