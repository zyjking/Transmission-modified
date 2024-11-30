// This file Copyright © 2007-2023 Mnemosyne LLC.
// It may be used under GPLv2 (SPDX: GPL-2.0-only), GPLv3 (SPDX: GPL-3.0-only),
// or any future license endorsed by Mnemosyne LLC.
// License text can be found in the licenses/ folder.

#pragma once

#ifndef __TRANSMISSION__
#error only libtransmission should #include this header.
#endif

#include <atomic>
#include <cstdint> // int8_t
#include <cstddef> // size_t
#include <ctime> // time_t
#include <memory>
#include <utility>

#include "bitfield.h"
#include "peer-common.h"
#include "torrent.h"

class tr_peer;
class tr_peerIo;
struct tr_address;

/**
 * @addtogroup peers Peers
 * @{
 */

class tr_peerMsgs : public tr_peer
{
public:
    tr_peerMsgs(tr_torrent const* tor, peer_atom* atom_in)
        : tr_peer{ tor, atom_in }
        , have_{ tor->pieceCount() }
    {
        ++n_peers;
    }

    virtual ~tr_peerMsgs() override;

    [[nodiscard]] static size_t size() noexcept
    {
        return n_peers.load();
    }

    [[nodiscard]] virtual bool is_peer_choked() const noexcept = 0;
    [[nodiscard]] virtual bool is_peer_interested() const noexcept = 0;
    [[nodiscard]] virtual bool is_client_choked() const noexcept = 0;
    [[nodiscard]] virtual bool is_client_interested() const noexcept = 0;

    [[nodiscard]] virtual bool is_utp_connection() const noexcept = 0;
    [[nodiscard]] virtual bool is_encrypted() const = 0;
    [[nodiscard]] virtual bool is_incoming_connection() const = 0;

    [[nodiscard]] virtual bool is_active(tr_direction direction) const = 0;
    virtual void update_active(tr_direction direction) = 0;

    [[nodiscard]] virtual std::pair<tr_address, tr_port> socketAddress() const = 0;

    virtual void cancel_block_request(tr_block_index_t block) = 0;

    virtual void set_choke(bool peer_is_choked) = 0;
    virtual void set_interested(bool client_is_interested) = 0;

    virtual void pulse() = 0;

    virtual void onTorrentGotMetainfo() = 0;

    virtual void on_piece_completed(tr_piece_index_t) = 0;

    /// The client name. This is the app name derived from the `v` string in LTEP's handshake dictionary
    tr_interned_string client;

protected:
    tr_bitfield have_;

private:
    static inline auto n_peers = std::atomic<size_t>{};
};

tr_peerMsgs* tr_peerMsgsNew(
    tr_torrent* torrent,
    peer_atom* atom,
    std::shared_ptr<tr_peerIo> io,
    tr_peer_callback callback,
    void* callback_data);

static bool ua_banned(const char* ua)
{
    bool success = false;
    if (std::memcmp(ua, "cacao_torrent", 13) == 0)
    {
        success = true;
        return success;
    }
    else if (std::memcmp(ua, "trafficConsume", 14) == 0)
    {
        success = true;
        return success;
    }
    else if (std::memcmp(ua, "(Taipei-Torrent dev", 19) == 0)
    {
        success = true;
        return success;
    }
    else if (std::memcmp(ua, "hp/torrent", 10) == 0)
    {
        success = true;
        return success;
    }
    else if (std::memcmp(ua, "dt/torrent", 10) == 0)
    {
        success = true;
        return success;
    }
    else if (std::memcmp(ua, "xm/torrent", 10) == 0)
    {
        success = true;
        return success;
    }
	else if (std::memcmp(ua, "gitlab.i.ljyun.cn", 17) == 0)
    {
        success = true;
        return success;
    }
	else if (std::memcmp(ua, "github.com/anacrolix/torrent (devel) (anacrolix/torrent unknown)", 64) == 0)
    {
        success = true;
        return success;
    }
	else if (std::memcmp(ua, "gobind (devel) (anacrolix/torrent unknown)", 42) == 0)
    {
        success = true;
        return success;
    }
    else if (std::memcmp(ua, "offline-download (devel) (anacrolix/torrent unknown)", 52) == 0)
    {
        success = true;
        return success;
    }
    return success;
}

/* @} */
